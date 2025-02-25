import {initializeOrg} from 'sentry-test/initializeOrg';
import {mountWithTheme, screen, userEvent} from 'sentry-test/reactTestingLibrary';

import AddDashboardIssueWidgetModal from 'sentry/components/modals/addDashboardIssueWidgetModal';

jest.mock('sentry/actionCreators/modal', () => ({
  openDashboardWidgetLibraryModal: jest.fn(),
}));

const stubEl: any = (props: any) => <div>{props.children}</div>;

function mountModal({initialData, onAddWidget, onUpdateWidget, widget}) {
  return mountWithTheme(
    <AddDashboardIssueWidgetModal
      Header={stubEl}
      Body={stubEl}
      Footer={stubEl}
      CloseButton={stubEl}
      organization={initialData.organization}
      onAddWidget={onAddWidget}
      onUpdateWidget={onUpdateWidget}
      widget={widget}
      closeModal={() => void 0}
    />
  );
}

async function clickSubmit() {
  // Click on submit.
  userEvent.click(screen.getByText('Add Widget'));
}

describe('Modals -> AddDashboardIssueWidgetModal', function () {
  const initialData = initializeOrg({
    organization: {
      features: ['performance-view', 'discover-query'],
      apdexThreshold: 400,
    },
    router: {
      location: {},
    },
    project: 1,
    projects: [],
  });

  beforeEach(function () {
    MockApiClient.addMockResponse({
      url: '/organizations/org-slug/dashboards/widgets/',
      method: 'POST',
      statusCode: 200,
      body: [],
    });
  });

  afterEach(() => {
    MockApiClient.clearMockResponses();
  });

  it('sets widgetType to dashboard', async function () {
    const onAdd = jest.fn();
    const wrapper = mountModal({
      initialData,
      onAddWidget: onAdd,
      onUpdateWidget: () => undefined,
      widget: undefined,
    });
    await clickSubmit();

    expect(onAdd).toHaveBeenCalledWith(
      expect.objectContaining({
        displayType: 'table',
        interval: '5m',
        queries: [
          {conditions: '', fields: ['issue', 'assignee', 'title'], name: '', orderby: ''},
        ],
        title: '',
        widgetType: 'issue',
      })
    );
    wrapper.unmount();
  });
});
