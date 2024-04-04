import { z } from 'zod';
import dictionary from '@/dictionary/en.json';
export const TimelineFormSchema = z.object({
  chainName: z.string().min(1, {
    message: dictionary.chainNameRequired,
  }),
  compareWith: z.string().optional(),
  period: z.string().optional(),
});
