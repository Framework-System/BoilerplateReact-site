import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import type { Job } from '@/types';
import { baseUrl } from '@/config';

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