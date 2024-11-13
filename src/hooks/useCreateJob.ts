import { baseUrl } from '@/config';
import type { Job } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const createJob = async (jobData: Partial<Job>): Promise<Job> => {
  const { data } = await axios.post(`${baseUrl}/jobs`, jobData);
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
