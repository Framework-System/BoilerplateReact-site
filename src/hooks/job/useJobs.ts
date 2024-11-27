import { httpService } from '@/services/httpService';
import type { Job } from '@/types';
import { useQuery } from '@tanstack/react-query';

const fetchJobs = async (): Promise<Array<Job>> => {
  const { data } = await httpService.get<Array<Job>>('/jobs');
  return data;
};

export const useJobs = () => {
  return useQuery({
    queryKey: ['jobs'],
    queryFn: fetchJobs,
  });
};