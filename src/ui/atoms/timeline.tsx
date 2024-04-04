import { useMemo } from 'react';
import { type AxisOptions, Chart } from 'react-charts';
import { DataPoint, TimelineDataResponse } from '@/types/timeline';
const Timeline = ({ data, chainName, compareWith }: { data: TimelineDataResponse; chainName?: string; compareWith?: string }) => {
  const [blockData, blockDataCompare] = useMemo(() => {
    const blockData: DataPoint[] =
      data.blockchain.tg_growth_index && Array.isArray(data.blockchain.tg_growth_index)
        ? data.blockchain.tg_growth_index.map((item) => ({
            date: item.date,
            value: item.value,
          }))
        : [];

    const blockDataCompare: DataPoint[] =
      data.cumulative.tg_growth_index && Array.isArray(data.cumulative.tg_growth_index)
        ? data.cumulative.tg_growth_index.map((item) => ({
            date: item.date,
            value: item.value,
          }))
        : [];

    return [blockData, blockDataCompare];
  }, [data]);

  const endData = [
    { data: blockData, label: chainName },
    { data: blockDataCompare, label: compareWith },
  ];

  const primaryAxis = useMemo(
    (): AxisOptions<DataPoint> => ({
      getValue: (datum) => new Date(datum.date),
    }),
    [],
  );

  const secondaryAxes = useMemo(
    (): AxisOptions<DataPoint>[] => [
      {
        getValue: (datum) => datum.value,
      },
    ],
    [],
  );
  return (
    <div className="mt-8 h-[500px] w-full">
      <Chart
        options={{
          data: endData,
          primaryAxis,
          secondaryAxes,
        }}
      />
    </div>
  );
};

export default Timeline;
