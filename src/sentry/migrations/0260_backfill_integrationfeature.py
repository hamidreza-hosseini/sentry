# Generated by Django 2.2.24 on 2021-12-10 19:04

from django.db import migrations

from sentry.models.integrationfeature import IntegrationTypes
from sentry.utils.query import RangeQuerySetWrapperWithProgressBar


def backfill_target_id(apps, schema_editor):
    IntegrationFeature = apps.get_model("sentry", "IntegrationFeature")

    for integration_feature in RangeQuerySetWrapperWithProgressBar(
        IntegrationFeature.objects.all()
    ):
        integration_feature.target_id = integration_feature.sentry_app.id
        integration_feature.target_type = IntegrationTypes.SENTRY_APP.value
        integration_feature.save()


class Migration(migrations.Migration):
    # This flag is used to mark that a migration shouldn't be automatically run in
    # production. We set this to True for operations that we think are risky and want
    # someone from ops to run manually and monitor.
    # General advice is that if in doubt, mark your migration as `is_dangerous`.
    # Some things you should always mark as dangerous:
    # - Large data migrations. Typically we want these to be run manually by ops so that
    #   they can be monitored. Since data migrations will now hold a transaction open
    #   this is even more important.
    # - Adding columns to highly active tables, even ones that are NULL.
    is_dangerous = False

    # This flag is used to decide whether to run this migration in a transaction or not.
    # By default we prefer to run in a transaction, but for migrations where you want
    # to `CREATE INDEX CONCURRENTLY` this needs to be set to False. Typically you'll
    # want to create an index concurrently when adding one to an existing table.
    # You'll also usually want to set this to `False` if you're writing a data
    # migration, since we don't want the entire migration to run in one long-running
    # transaction.
    atomic = False

    dependencies = [
        ("sentry", "0259_delete_codeowners_and_code_mappings_with_no_integration"),
    ]

    operations = [
        migrations.RunPython(
            backfill_target_id,
            migrations.RunPython.noop,
            hints={"tables": ["sentry_integrationfeature"]},
        )
    ]
