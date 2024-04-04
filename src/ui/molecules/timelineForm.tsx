import React, { useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@ui/atoms/form';
import { Input } from '@ui/atoms/input';
import { TimelineFormSchema } from '@/utils/timelineFormSchema';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@ui/atoms/select';
import { useDebounce } from '@uidotdev/usehooks';
import dictionary from '@/dictionary/en.json';
import { TimelineFormDataType } from '@/types/timeline';
import { periodOptions } from '@/utils/const';

const TimelineForm = ({ setFormData }: { setFormData: (_data: TimelineFormDataType) => void }) => {
  const form = useForm<z.infer<typeof TimelineFormSchema>>({
    resolver: zodResolver(TimelineFormSchema),
    mode: 'onChange',
    defaultValues: {
      chainName: 'ethereum',
      compareWith: '',
      period: Object.entries(periodOptions)[0][0],
    },
  });
  const period = form.watch('period');
  const debouncedChainName = useDebounce(form.getValues().chainName, 300);
  const debouncedCompareWith = useDebounce(form.getValues().compareWith, 300);

  useEffect(() => {
    setFormData(form.getValues());
  }, [debouncedChainName, debouncedCompareWith, period]);

  return (
    <Form {...form}>
      <form className="flex items-start justify-start gap-8" data-testid="form">
        <FormField
          control={form.control}
          name="chainName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{dictionary.blockchain}</FormLabel>
              <FormControl>
                <Input data-testid="chainNameInput" placeholder={dictionary.blockchain} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="compareWith"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{dictionary.compareWith}</FormLabel>
              <FormControl>
                <Input placeholder={dictionary.compareWith} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="period"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{dictionary.dateRange}</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder={dictionary.selectDateRange} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.entries(periodOptions).map(([key, value]) => (
                    <SelectItem key={key} value={key}>
                      {value}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

export default TimelineForm;
