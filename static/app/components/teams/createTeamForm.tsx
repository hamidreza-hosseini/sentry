import {Component, Fragment} from 'react';

import {t} from 'sentry/locale';
import {Organization} from 'sentry/types';
import {callIfFunction} from 'sentry/utils/callIfFunction';
import slugify from 'sentry/utils/slugify';
import Form from 'sentry/views/settings/components/forms/form';
import TextField from 'sentry/views/settings/components/forms/textField';

type Payload = {
  slug: string;
};

type Props = {
  organization: Organization;
  onSubmit?: (data: Payload, onSuccess: Function, onError: Function) => void;
  onSuccess?: (data: Payload) => void;
  formProps?: Partial<typeof Form>;
};

export default class CreateTeamForm extends Component<Props> {
  handleSubmit = (data: Record<string, any>, onSuccess: Function, onError: Function) => {
    callIfFunction(this.props.onSubmit, data as Payload, onSuccess, onError);
  };

  handleCreateTeamSuccess = (data: Payload) => {
    callIfFunction(this.props.onSuccess, data);
  };

  render() {
    const {organization} = this.props;

    return (
      <Fragment>
        <p>
          {t(
            'Members of a team have access to specific areas, such as a new release or a new application feature.'
          )}
        </p>

        <Form
          submitLabel={t('Create Team')}
          apiEndpoint={`/organizations/${organization.slug}/teams/`}
          apiMethod="POST"
          onSubmit={this.handleSubmit}
          onSubmitSuccess={this.handleCreateTeamSuccess}
          requireChanges
          data-test-id="create-team-form"
          {...this.props.formProps}
        >
          <TextField
            name="slug"
            label={t('Team Name')}
            placeholder={t('e.g. operations, web-frontend, desktop')}
            help={t('May contain lowercase letters, numbers, dashes and underscores.')}
            required
            stacked
            flexibleControlStateSize
            inline={false}
            transformInput={slugify}
          />
        </Form>
      </Fragment>
    );
  }
}
