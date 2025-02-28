import {Component} from 'react';
import styled from '@emotion/styled';

import space from 'sentry/styles/space';
import {Integration} from 'sentry/types';
import IntegrationIcon from 'sentry/views/organizationIntegrations/integrationIcon';

type DefaultProps = {
  compact: boolean;
};

type Props = DefaultProps & {
  integration: Integration;
};
export default class IntegrationItem extends Component<Props> {
  static defaultProps: DefaultProps = {
    compact: false,
  };

  render() {
    const {integration, compact} = this.props;
    return (
      <Flex>
        <div>
          <IntegrationIcon size={compact ? 22 : 32} integration={integration} />
        </div>
        <Labels compact={compact}>
          <IntegrationName data-test-id="integration-name">
            {integration.name}
          </IntegrationName>
          <DomainName compact={compact}>{integration.domainName}</DomainName>
        </Labels>
      </Flex>
    );
  }
}

const Flex = styled('div')`
  display: flex;
`;
type StyledProps = Pick<Props, 'compact'>;
const Labels = styled('div')<StyledProps>`
  box-sizing: border-box;
  display: flex;
  ${p => (p.compact ? 'align-items: center;' : '')};
  flex-direction: ${p => (p.compact ? 'row' : 'column')};
  padding-left: ${space(1)};
  min-width: 0;
  justify-content: center;
`;

const IntegrationName = styled('div')`
  font-size: 1.6rem;
`;

// Not using the overflowEllipsis style import here
// as it sets width 100% which causes layout issues in the
// integration list.
const DomainName = styled('div')<StyledProps>`
  color: ${p => (p.compact ? p.theme.gray200 : p.theme.gray400)};
  margin-left: ${p => (p.compact ? space(1) : 'inherit')};
  margin-top: ${p => (!p.compact ? space(0.25) : 'inherit')};
  font-size: 1.4rem;
  line-height: 1.2;
  overflow: hidden;
  text-overflow: ellipsis;
`;
