import { httpService } from '@/services/httpService';
import type { Job } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const createJob = async (jobData: Partial<Job>): Promise<Job> => {
  const { data } = await httpService.post<Job>('/jobs', jobData);
  return data;
};

export const useCreateJob = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createJob,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
    },
  });
};