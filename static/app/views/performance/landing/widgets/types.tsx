import React, {FunctionComponent, ReactNode} from 'react';
import {InjectedRouter} from 'react-router';

import {RenderProps} from 'app/components/charts/eventsRequest';
import {Organization} from 'app/types';
import {Series} from 'app/types/echarts';
import EventView from 'app/utils/discover/eventView';
import {
  HistogramChildren,
  HistogramChildrenProps,
} from 'app/utils/performance/histogram/histogramQuery';
import DurationChart from 'app/views/performance/charts/chart';

import {PerformanceWidgetContainerTypes} from './components/performanceWidgetContainer';

export enum GenericPerformanceWidgetDataType {
  histogram = 'histogram',
  area = 'area',
  vitals = 'vitals',
}

export type GenericPerformanceWidgetProps = {
  // Header;
  title: string;
  titleTooltip: string;
  subtitle?: JSX.Element;

  fields: string[];
  chartHeight: number;
  dataType: GenericPerformanceWidgetDataType;
  containerType: PerformanceWidgetContainerTypes;
  HeaderActions?: FunctionComponent<{
    widgetData: WidgetData;
    setChartSetting: (setting: any) => void;
  }>;

  location: Location;
  eventView: EventView;
  organization: Organization;
} & WidgetDataProps;

export type WidgetDataProps = {
  widgetData: WidgetData;
  setWidgetDataForKey: (dataKey: string, result: WidgetDataTypes) => {};
};

export type HistogramQueryChildrenProps = HistogramChildrenProps;
export type HistogramQueryChildren = HistogramChildren;

export type EventsRequestChildrenProps = RenderProps;

export type CommonPerformanceQueryData = {
  data: any;
  loading: boolean;
  // reloading: boolean;
  errored: boolean;

  timeseriesData?: Series[];
  previousTimeseriesData?: Series[];
};

type AreaWidgetFunctionProps = AreaWidgetProps & {router: InjectedRouter};

export type QueryChildren = {
  children: (props: CommonPerformanceQueryData) => ReactNode;
};
export type QueryFC = FunctionComponent<QueryChildren>;

export type QueryDefinition = {
  component: QueryFC;
  enabled?: (data: WidgetData) => boolean;
  transform: (
    props: AreaWidgetFunctionProps,
    results: CommonPerformanceQueryData
  ) => CommonPerformanceQueryData;
};
export type Queries = {
  [dataKey: string]: QueryDefinition;
};

export type AreaWidgetProps = GenericPerformanceWidgetProps & {
  dataType: GenericPerformanceWidgetDataType.area;
  Queries: Queries;
  Visualizations: {
    [dataKey: string]: {
      component: FunctionComponent<React.ComponentProps<typeof DurationChart>>;
      height: number; // Used to determine placeholder and loading sizes. Will also be passed to the component.
    };
  };
};

export interface WidgetDataTypes extends CommonPerformanceQueryData {}
// TODO(k-fish): Refine this.
export type WidgetData = {
  [dataKey: string]: WidgetDataTypes;
};
