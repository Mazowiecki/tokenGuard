export type TimelineFetchParams = {
  chainName: string;
  period: string;
  metric: string;
  compareWith: [string] | [];
};

export type TimelineFormDataType = {
  chainName: string;
  compareWith?: string;
  period?: string;
};

export type DataPoint = {
  date: string;
  value: number;
};

type BlockchainData = {
  tg_growth_index: DataPoint[];
};

export type TimelineDataResponse = {
  blockchain: BlockchainData;
  cumulative: BlockchainData | Record<string, unknown>;
};
