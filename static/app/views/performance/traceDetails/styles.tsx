import styled from '@emotion/styled';
import {Location} from 'history';

import EventTagsPill from 'sentry/components/events/eventTags/eventTagsPill';
import {SecondaryHeader} from 'sentry/components/events/interfaces/spans/header';
import {Panel} from 'sentry/components/panels';
import Pills from 'sentry/components/pills';
import SearchBar from 'sentry/components/searchBar';
import space from 'sentry/styles/space';
import {Organization} from 'sentry/types';
import {defined} from 'sentry/utils';
import {TraceFullDetailed} from 'sentry/utils/performance/quickTrace/types';
import {appendTagCondition} from 'sentry/utils/queryString';
import {transactionSummaryRouteWithQuery} from 'sentry/views/performance/transactionSummary/utils';

export {
  Row,
  SpanDetails as TransactionDetails,
  SpanDetailContainer as TransactionDetailsContainer,
} from 'sentry/components/events/interfaces/spans/spanDetail';

export const TraceSearchContainer = styled('div')`
  display: flex;
  width: 100%;
`;

export const TraceSearchBar = styled(SearchBar)`
  flex-grow: 1;
`;

export const TraceViewHeaderContainer = styled(SecondaryHeader)`
  position: static;
  top: auto;
  border-top: none;
  border-bottom: 1px solid ${p => p.theme.border};
`;

export const TraceDetailHeader = styled('div')`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: ${space(3)};
  margin-bottom: ${space(2)};

  @media (min-width: ${p => p.theme.breakpoints[1]}) {
    grid-template-columns: max-content max-content;
    grid-row-gap: 0;
  }
`;

export const TraceDetailBody = styled('div')`
  margin-top: ${space(2)};
`;

export const TraceViewContainer = styled('div')`
  overflow-x: hidden;
  border-bottom-left-radius: 3px;
  border-bottom-right-radius: 3px;
`;

export const TracePanel = styled(Panel)`
  overflow: hidden;
`;

export const ProjectBadgeContainer = styled('span')`
  margin-right: ${space(0.75)};
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const StyledPills = styled(Pills)`
  padding-top: ${space(1.5)};
`;

export function Tags({
  location,
  organization,
  transaction,
}: {
  location: Location;
  organization: Organization;
  transaction: TraceFullDetailed;
}) {
  const {tags} = transaction;

  if (!tags || tags.length <= 0) {
    return null;
  }

  const orgSlug = organization.slug;
  const releasesPath = `/organizations/${orgSlug}/releases/`;

  return (
    <tr>
      <td className="key">Tags</td>
      <td className="value">
        <StyledPills>
          {tags.map((tag, index) => {
            const {pathname: streamPath, query} = transactionSummaryRouteWithQuery({
              orgSlug,
              transaction: transaction.transaction,
              projectID: String(transaction.project_id),
              query: {
                ...location.query,
                query: appendTagCondition(location.query.query, tag.key, tag.value),
              },
            });

            return (
              <EventTagsPill
                key={!defined(tag.key) ? `tag-pill-${index}` : tag.key}
                tag={tag}
                projectId={transaction.project_slug}
                organization={organization}
                query={query}
                streamPath={streamPath}
                releasesPath={releasesPath}
              />
            );
          })}
        </StyledPills>
      </td>
    </tr>
  );
}
