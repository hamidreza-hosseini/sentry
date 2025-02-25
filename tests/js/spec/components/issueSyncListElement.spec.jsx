import {mountWithTheme} from 'sentry-test/enzyme';

import IssueSyncListElement from 'sentry/components/issueSyncListElement';

describe('AlertLink', function () {
  it('renders', function () {
    const wrapper = mountWithTheme(<IssueSyncListElement integrationType="github" />);
    expect(wrapper).toSnapshot();
  });

  it('can open', function () {
    const onOpen = jest.fn();
    const wrapper = mountWithTheme(
      <IssueSyncListElement integrationType="github" onOpen={onOpen} />
    );
    expect(onOpen).not.toHaveBeenCalled();
    wrapper.find('IntegrationLink').simulate('click');
    expect(onOpen).toHaveBeenCalled();
  });

  it('can close', function () {
    const onClose = jest.fn();
    const onOpen = jest.fn();

    const wrapper = mountWithTheme(
      <IssueSyncListElement
        integrationType="github"
        externalIssueLink="github.com/issues/gh-101"
        externalIssueId={101}
        onClose={onClose}
        onOpen={onOpen}
      />
    );

    expect(onClose).not.toHaveBeenCalled();
    wrapper.find('StyledIcon').simulate('click');
    expect(onClose).toHaveBeenCalled();
  });
});
