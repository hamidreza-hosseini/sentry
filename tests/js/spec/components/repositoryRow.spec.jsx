import {mountWithTheme} from 'sentry-test/enzyme';
import {mountGlobalModal} from 'sentry-test/modal';

import {Client} from 'sentry/api';
import RepositoryRow from 'sentry/components/repositoryRow';

describe('RepositoryRow', function () {
  beforeEach(function () {
    Client.clearMockResponses();
  });

  const repository = TestStubs.Repository();
  const pendingRepo = TestStubs.Repository({
    status: 'pending_deletion',
  });
  const customRepo = TestStubs.Repository({
    provider: {
      id: 'integrations:custom_scm',
    },
  });
  const customPendingRepo = TestStubs.Repository({
    provider: {
      id: 'integrations:custom_scm',
    },
    status: 'pending_deletion',
  });
  const api = new Client();

  describe('rendering with access', function () {
    const organization = TestStubs.Organization({
      access: ['org:integrations'],
    });
    const routerContext = TestStubs.routerContext([{organization}]);

    it('displays provider information', function () {
      const wrapper = mountWithTheme(
        <RepositoryRow
          repository={repository}
          api={api}
          orgId={organization.slug}
          organization={organization}
        />,
        routerContext
      );
      expect(wrapper.find('strong').text()).toEqual(repository.name);
      expect(wrapper.find('small a').text()).toEqual('github.com/example/repo-name');

      // Trash button should display enabled
      expect(wrapper.find('Confirm').props().disabled).toEqual(false);

      // No cancel button
      expect(wrapper.find('Button[data-test-id="repo-cancel"]')).toHaveLength(0);
    });

    it('displays cancel pending button', function () {
      const wrapper = mountWithTheme(
        <RepositoryRow
          repository={pendingRepo}
          api={api}
          orgId={organization.slug}
          organization={organization}
        />,
        routerContext
      );

      // Trash button should be disabled
      expect(wrapper.find('Confirm').props().disabled).toEqual(true);
      expect(wrapper.find('Button[label="delete"]').props().disabled).toEqual(true);

      // Cancel button active
      const cancel = wrapper.find('Button[data-test-id="repo-cancel"]');
      expect(cancel).toHaveLength(1);
      expect(cancel.props().disabled).toEqual(false);
    });
  });

  describe('rendering without access', function () {
    const organization = TestStubs.Organization({
      access: ['org:write'],
    });
    const routerContext = TestStubs.routerContext([{organization}]);

    it('displays disabled trash', function () {
      const wrapper = mountWithTheme(
        <RepositoryRow
          repository={repository}
          api={api}
          orgId={organization.slug}
          organization={organization}
        />,
        routerContext
      );

      // Trash button should be disabled
      expect(wrapper.find('Confirm').props().disabled).toEqual(true);
      expect(wrapper.find('Button[label="delete"]').props().disabled).toEqual(true);
    });

    it('displays disabled cancel', function () {
      const wrapper = mountWithTheme(
        <RepositoryRow
          repository={pendingRepo}
          api={api}
          orgId={organization.slug}
          organization={organization}
        />,
        routerContext
      );

      // Cancel should be disabled
      expect(wrapper.find('Button[data-test-id="repo-cancel"]').props().disabled).toEqual(
        true
      );
    });
  });

  describe('deletion', function () {
    const organization = TestStubs.Organization({
      access: ['org:integrations'],
    });
    const routerContext = TestStubs.routerContext([{organization}]);

    it('sends api request on delete', async function () {
      const deleteRepo = Client.addMockResponse({
        url: `/organizations/${organization.slug}/repos/${repository.id}/`,
        method: 'DELETE',
        statusCode: 204,
        body: {},
      });

      const wrapper = mountWithTheme(
        <RepositoryRow
          repository={repository}
          api={api}
          orgId={organization.slug}
          organization={organization}
        />,
        routerContext
      );
      wrapper.find('Button[label="delete"]').simulate('click');

      // Confirm modal
      const modal = await mountGlobalModal();
      modal.find('Button[priority="primary"]').simulate('click');
      await wrapper.update();

      expect(deleteRepo).toHaveBeenCalled();
    });
  });

  describe('cancel deletion', function () {
    const organization = TestStubs.Organization({
      access: ['org:integrations'],
    });
    const routerContext = TestStubs.routerContext([{organization}]);

    it('sends api request to cancel', async function () {
      const cancel = Client.addMockResponse({
        url: `/organizations/${organization.slug}/repos/${pendingRepo.id}/`,
        method: 'PUT',
        statusCode: 204,
        body: {},
      });

      const wrapper = mountWithTheme(
        <RepositoryRow
          repository={pendingRepo}
          api={api}
          orgId={organization.slug}
          organization={organization}
        />,
        routerContext
      );
      wrapper.find('Button[data-test-id="repo-cancel"]').simulate('click');
      await wrapper.update();

      expect(cancel).toHaveBeenCalled();
    });
  });

  describe('renders custom_scm repo', function () {
    const organization = TestStubs.Organization({
      access: ['org:integrations'],
      features: ['integrations-custom-scm'],
    });
    const routerContext = TestStubs.routerContext([{organization}]);

    it('displays edit button', function () {
      const wrapper = mountWithTheme(
        <RepositoryRow
          repository={customRepo}
          api={api}
          orgId={organization.slug}
          organization={organization}
        />,
        routerContext
      );

      // Trash button should display enabled
      expect(wrapper.find('Confirm').props().disabled).toEqual(false);
      // No cancel button
      expect(wrapper.find('Button[data-test-id="repo-cancel"]')).toHaveLength(0);

      // Edit button should display enabled
      expect(wrapper.find('Button[label="edit"]').props().disabled).toEqual(false);
    });

    it('disables edit button when cancel pending', function () {
      const wrapper = mountWithTheme(
        <RepositoryRow
          repository={customPendingRepo}
          api={api}
          orgId={organization.slug}
          organization={organization}
        />,
        routerContext
      );

      // Trash button should be disabled
      expect(wrapper.find('Confirm').props().disabled).toEqual(true);
      expect(wrapper.find('Button[label="delete"]').props().disabled).toEqual(true);

      // Edit button should be disabled
      expect(wrapper.find('Button[label="edit"]').props().disabled).toEqual(true);

      // Cancel button active
      const cancel = wrapper.find('Button[data-test-id="repo-cancel"]');
      expect(cancel).toHaveLength(1);
      expect(cancel.props().disabled).toEqual(false);
    });
  });
});
