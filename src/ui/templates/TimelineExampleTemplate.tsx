import React, { useEffect, useState } from 'react';
import { baseUrl } from '@/utils/const';
import { useQuery } from '@tanstack/react-query';
import { TimelineFormDataType, TimelineFetchParams, TimelineDataResponse } from '@/types/timeline';
import TimelineForm from '@ui/molecules/timelineForm';
import Timeline from '@ui/atoms/timeline';
import { Skeleton } from '@ui/atoms/skeleton';
import { toast } from 'sonner';

const TimelineExampleTemplate = () => {
  const [formData, setFormData] = useState<TimelineFormDataType>();
  const fetchData = async ({ queryKey }: { queryKey: [string, TimelineFetchParams] }): Promise<TimelineDataResponse> => {
    const [, params] = queryKey;
    const response = await fetch(`${baseUrl}/db-api/growth-index/basic-timeline-data`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chainName: params.chainName,
        period: params.period,
        metric: params.metric,
        compareWith: params.compareWith,
      }),
    });

    return await response.json();
  };

  const { error, isFetching, isFetched, isSuccess, data } = useQuery({
    enabled: Boolean(formData) && Boolean(formData?.chainName),
    queryKey: [
      'balancesList',
      {
        chainName: formData?.chainName || '',
        compareWith: formData?.compareWith ? [formData.compareWith] : [],
        period: '3 months',
        metric: 'tg_growth_index',
      },
    ],
    queryFn: fetchData,
  });

  useEffect(() => {
    if (error) {
      toast.error(error.toString());
    }
  }, [error]);

  return (
    <>
      <TimelineForm setFormData={setFormData} />
      {isFetched && isSuccess && !isFetching && <Timeline data={data} chainName={formData?.chainName} compareWith={formData?.compareWith} />}
      {isFetching && <Skeleton className="mt-8 h-[500px] w-auto rounded-xl" />}
    </>
  );
};

export default TimelineExampleTemplate;
