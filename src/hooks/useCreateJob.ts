import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import type { Job } from '@/types';

const createJob = async (jobData: Partial<Job>): Promise<Job> => {
  const { data } = await axios.post('https://6733aacfa042ab85d1179d1b.mockapi.io/api/v1/jobs', jobData);
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