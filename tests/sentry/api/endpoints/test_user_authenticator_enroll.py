import os
from unittest import mock
from urllib.parse import parse_qsl

from django.conf import settings
from django.core import mail
from django.db.models import F
from django.urls import reverse

from sentry.models import (
    AuditLogEntry,
    AuditLogEntryEvent,
    Authenticator,
    Organization,
    OrganizationMember,
    UserEmail,
)
from sentry.testutils import APITestCase
from tests.sentry.api.endpoints.test_user_authenticator_details import assert_security_email_sent


# TODO(joshuarli): move all fixtures to a standard path relative to gitroot,
#                  and implement this in testutils
def get_fixture_path(name):
    return os.path.join(
        os.path.dirname(__file__), os.pardir, os.pardir, os.pardir, "fixtures", name
    )


class UserAuthenticatorEnrollTest(APITestCase):
    endpoint = "sentry-api-0-user-authenticator-enroll"

    def setUp(self):
        self.login_as(user=self.user)

    @mock.patch("sentry.auth.authenticators.TotpInterface.validate_otp", return_value=True)
    def test_totp_can_enroll(self, validate_otp):
        # XXX: Pretend an unbound function exists.
        validate_otp.__func__ = None

        with mock.patch(
            "sentry.auth.authenticators.base.generate_secret_key", return_value="Z" * 32
        ):
            resp = self.get_success_response("me", "totp")

        assert resp.data["secret"] == "Z" * 32
        assert (
            resp.data["qrcode"]
            == "otpauth://totp/admin%40localhost?issuer=Sentry&secret=ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ"
        )
        assert resp.data["form"]
        assert resp.data["secret"]

        # try to enroll
        with self.tasks():
            self.get_success_response(
                "me", "totp", method="post", **{"secret": "secret12", "otp": "1234"}
            )
        assert validate_otp.call_count == 1
        assert validate_otp.call_args == mock.call("1234")

        interface = Authenticator.objects.get_interface(user=self.user, interface_id="totp")
        assert interface
        assert interface.secret == "secret12"
        assert interface.config == {"secret": "secret12"}

        # also enrolls in recovery codes
        recovery = Authenticator.objects.get_interface(user=self.user, interface_id="recovery")
        assert recovery.is_enrolled()

        assert_security_email_sent("mfa-added")

        # can rotate in place
        self.get_success_response("me", "totp")
        self.get_success_response(
            "me", "totp", method="post", **{"secret": "secret56", "otp": "5678"}
        )
        assert validate_otp.call_args == mock.call("5678")

        interface = Authenticator.objects.get_interface(user=self.user, interface_id="totp")
        assert interface.secret == "secret56"
        assert interface.config == {"secret": "secret56"}

    @mock.patch("sentry.auth.authenticators.TotpInterface.validate_otp", return_value=False)
    def test_invalid_otp(self, validate_otp):
        # XXX: Pretend an unbound function exists.
        validate_otp.__func__ = None

        # try to enroll
        with self.tasks():
            self.get_error_response(
                "me",
                "totp",
                method="post",
                status_code=400,
                **{"secret": "secret12", "otp": "1234"},
            )

        assert validate_otp.call_count == 1
        assert validate_otp.call_args == mock.call("1234")

        assert len(mail.outbox) == 0

    @mock.patch("sentry.auth.authenticators.SmsInterface.validate_otp", return_value=True)
    @mock.patch("sentry.auth.authenticators.SmsInterface.send_text", return_value=True)
    def test_sms_can_enroll(self, send_text, validate_otp):
        # XXX: Pretend an unbound function exists.
        validate_otp.__func__ = None

        new_options = settings.SENTRY_OPTIONS.copy()
        new_options["sms.twilio-account"] = "twilio-account"

        with self.settings(SENTRY_OPTIONS=new_options):
            resp = self.get_success_response("me", "sms")
            assert resp.data["form"]
            assert resp.data["secret"]

            self.get_success_response(
                "me", "sms", method="post", **{"secret": "secret12", "phone": "1231234"}
            )
            assert send_text.call_count == 1
            assert validate_otp.call_count == 0

            with self.tasks():
                self.get_success_response(
                    "me",
                    "sms",
                    method="post",
                    **{"secret": "secret12", "phone": "1231234", "otp": "123123"},
                )
            assert validate_otp.call_count == 1
            assert validate_otp.call_args == mock.call("123123")

            interface = Authenticator.objects.get_interface(user=self.user, interface_id="sms")
            assert interface.phone_number == "1231234"

            assert_security_email_sent("mfa-added")

    def test_sms_invalid_otp(self):
        new_options = settings.SENTRY_OPTIONS.copy()
        new_options["sms.twilio-account"] = "twilio-account"

        with self.settings(SENTRY_OPTIONS=new_options):
            self.get_error_response(
                "me",
                "sms",
                method="post",
                status_code=400,
                **{"secret": "secret12", "phone": "1231234", "otp": None},
            )
            self.get_error_response(
                "me",
                "sms",
                method="post",
                status_code=400,
                **{"secret": "secret12", "phone": "1231234", "otp": ""},
            )

    def test_sms_no_verified_email(self):
        user = self.create_user()
        UserEmail.objects.filter(user=user, email=user.email).update(is_verified=False)

        self.login_as(user)
        new_options = settings.SENTRY_OPTIONS.copy()
        new_options["sms.twilio-account"] = "twilio-account"

        with self.settings(SENTRY_OPTIONS=new_options):
            resp = self.get_error_response(
                "me",
                "sms",
                method="post",
                status_code=401,
                **{"secret": "secret12", "phone": "1231234", "otp": None},
            )
            assert resp.data == {
                "detail": {
                    "code": "email-verification-required",
                    "message": "Email verification required.",
                    "extra": {"username": user.email},
                }
            }

    @mock.patch(
        "sentry.api.endpoints.user_authenticator_enroll.ratelimiter.is_limited", return_value=True
    )
    @mock.patch("sentry.auth.authenticators.U2fInterface.try_enroll", return_value=True)
    def test_rate_limited(self, try_enroll, is_limited):
        new_options = settings.SENTRY_OPTIONS.copy()
        new_options["system.url-prefix"] = "https://testserver"
        with self.settings(SENTRY_OPTIONS=new_options):
            self.get_success_response("me", "u2f")
            self.get_error_response(
                "me",
                "u2f",
                method="post",
                status_code=429,
                **{
                    "deviceName": "device name",
                    "challenge": "challenge",
                    "response": "response",
                },
            )

            assert try_enroll.call_count == 0

    @mock.patch("sentry.auth.authenticators.U2fInterface.try_enroll", return_value=True)
    def test_u2f_can_enroll(self, try_enroll):
        new_options = settings.SENTRY_OPTIONS.copy()
        new_options["system.url-prefix"] = "https://testserver"
        with self.settings(SENTRY_OPTIONS=new_options):
            resp = self.get_success_response("me", "u2f")
            assert resp.data["form"]
            assert "secret" not in resp.data
            assert "qrcode" not in resp.data
            assert resp.data["challenge"]

            with self.tasks():
                self.get_success_response(
                    "me",
                    "u2f",
                    method="post",
                    **{
                        "deviceName": "device name",
                        "challenge": "challenge",
                        "response": "response",
                    },
                )

            assert try_enroll.call_count == 1
            assert try_enroll.call_args == mock.call("challenge", "response", "device name")

            assert_security_email_sent("mfa-added")


class AcceptOrganizationInviteTest(APITestCase):
    endpoint = "sentry-api-0-user-authenticator-enroll"

    def setUp(self):
        self.organization = self.create_organization(owner=self.create_user("foo@example.com"))
        self.user = self.create_user("bar@example.com", is_superuser=False)
        self.login_as(user=self.user)

        self.require_2fa_for_organization()
        self.assertFalse(Authenticator.objects.user_has_2fa(self.user))

    def require_2fa_for_organization(self):
        self.organization.update(flags=F("flags").bitor(Organization.flags.require_2fa))
        self.assertTrue(self.organization.flags.require_2fa.is_set)

    def _assert_pending_invite_cookie_set(self, response, om):
        invite_link = om.get_invite_link()
        invite_data = dict(parse_qsl(response.client.cookies["pending-invite"].value))
        assert invite_data.get("url") in invite_link

    def create_existing_om(self):
        OrganizationMember.objects.create(
            user=self.user, role="member", organization=self.organization
        )

    def get_om_and_init_invite(self):
        om = OrganizationMember.objects.create(
            email="newuser@example.com", role="member", token="abc", organization=self.organization
        )

        resp = self.client.get(
            reverse("sentry-api-0-accept-organization-invite", args=[om.id, om.token])
        )
        assert resp.status_code == 200
        self._assert_pending_invite_cookie_set(resp, om)

        return om

    def assert_invite_accepted(self, response, member_id: int) -> None:
        om = OrganizationMember.objects.get(id=member_id)
        assert om.user == self.user
        assert om.email is None

        AuditLogEntry.objects.get(
            organization=self.organization,
            target_object=om.id,
            target_user=self.user,
            event=AuditLogEntryEvent.MEMBER_ACCEPT,
            data=om.get_audit_log_data(),
        )

        self.assertFalse(response.client.cookies["pending-invite"].value)

    def setup_u2f(self):
        new_options = settings.SENTRY_OPTIONS.copy()
        new_options["system.url-prefix"] = "https://testserver"
        with self.settings(SENTRY_OPTIONS=new_options):
            return self.get_success_response(
                "me",
                "u2f",
                method="post",
                **{
                    "deviceName": "device name",
                    "challenge": "challenge",
                    "response": "response",
                },
            )

    def test_cannot_accept_invite_pending_invite__2fa_required(self):
        om = self.get_om_and_init_invite()

        om = OrganizationMember.objects.get(id=om.id)
        assert om.user is None
        assert om.email == "newuser@example.com"

    @mock.patch("sentry.auth.authenticators.U2fInterface.try_enroll", return_value=True)
    def test_accept_pending_invite__u2f_enroll(self, try_enroll):
        om = self.get_om_and_init_invite()
        resp = self.setup_u2f()

        self.assert_invite_accepted(resp, om.id)

    @mock.patch("sentry.auth.authenticators.SmsInterface.validate_otp", return_value=True)
    @mock.patch("sentry.auth.authenticators.SmsInterface.send_text", return_value=True)
    def test_accept_pending_invite__sms_enroll(self, send_text, validate_otp):
        # XXX: Pretend an unbound function exists.
        validate_otp.__func__ = None

        om = self.get_om_and_init_invite()

        # setup sms
        new_options = settings.SENTRY_OPTIONS.copy()
        new_options["sms.twilio-account"] = "twilio-account"

        with self.settings(SENTRY_OPTIONS=new_options):
            self.get_success_response(
                "me", "sms", method="post", **{"secret": "secret12", "phone": "1231234"}
            )
            resp = self.get_success_response(
                "me",
                "sms",
                method="post",
                **{
                    "secret": "secret12",
                    "phone": "1231234",
                    "otp": "123123",
                    "memberId": om.id,
                    "token": om.token,
                },
            )

            assert validate_otp.call_count == 1
            assert validate_otp.call_args == mock.call("123123")

            interface = Authenticator.objects.get_interface(user=self.user, interface_id="sms")
            assert interface.phone_number == "1231234"

        self.assert_invite_accepted(resp, om.id)

    @mock.patch("sentry.auth.authenticators.TotpInterface.validate_otp", return_value=True)
    def test_accept_pending_invite__totp_enroll(self, validate_otp):
        # XXX: Pretend an unbound function exists.
        validate_otp.__func__ = None

        om = self.get_om_and_init_invite()

        # setup totp
        self.get_success_response("me", "totp")
        resp = self.get_success_response(
            "me",
            "totp",
            method="post",
            **{"secret": "secret12", "otp": "1234", "memberId": om.id, "token": om.token},
        )

        interface = Authenticator.objects.get_interface(user=self.user, interface_id="totp")
        assert interface

        self.assert_invite_accepted(resp, om.id)

    @mock.patch("sentry.api.endpoints.user_authenticator_enroll.logger")
    @mock.patch("sentry.auth.authenticators.U2fInterface.try_enroll", return_value=True)
    def test_user_already_org_member(self, try_enroll, log):
        om = self.get_om_and_init_invite()
        self.create_existing_om()
        self.setup_u2f()

        assert not OrganizationMember.objects.filter(id=om.id).exists()

        log.info.assert_called_once_with(
            "Pending org invite not accepted - User already org member",
            extra={"organization_id": self.organization.id, "user_id": self.user.id},
        )

    @mock.patch("sentry.api.endpoints.user_authenticator_enroll.logger")
    @mock.patch("sentry.auth.authenticators.U2fInterface.try_enroll", return_value=True)
    def test_org_member_does_not_exist(self, try_enroll, log):
        om = self.get_om_and_init_invite()

        # Mutate the OrganizationMember, putting it out of sync with the
        # pending member cookie.
        om.update(id=om.id + 1)

        self.setup_u2f()

        om = OrganizationMember.objects.get(id=om.id)
        assert om.user is None
        assert om.email == "newuser@example.com"

        assert log.error.call_count == 1
        assert log.error.call_args[0][0] == "Invalid pending invite cookie"

    @mock.patch("sentry.api.endpoints.user_authenticator_enroll.logger")
    @mock.patch("sentry.auth.authenticators.U2fInterface.try_enroll", return_value=True)
    def test_invalid_token(self, try_enroll, log):
        om = self.get_om_and_init_invite()

        # Mutate the OrganizationMember, putting it out of sync with the
        # pending member cookie.
        om.update(token="123")

        self.setup_u2f()

        om = OrganizationMember.objects.get(id=om.id)
        assert om.user is None
        assert om.email == "newuser@example.com"

    @mock.patch("sentry.api.endpoints.user_authenticator_enroll.logger")
    @mock.patch("sentry.auth.authenticators.U2fInterface.try_enroll", return_value=True)
    def test_enroll_without_pending_invite__no_error(self, try_enroll, log):
        new_options = settings.SENTRY_OPTIONS.copy()
        new_options["system.url-prefix"] = "https://testserver"
        with self.settings(SENTRY_OPTIONS=new_options):
            self.get_success_response(
                "me",
                "u2f",
                method="post",
                **{
                    "deviceName": "device name",
                    "challenge": "challenge",
                    "response": "response",
                },
            )
        assert log.error.called is False
