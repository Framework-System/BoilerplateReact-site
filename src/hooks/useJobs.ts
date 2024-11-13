import { baseUrl } from '@/config';
import type { Job } from '@/types';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchJobs = async (): Promise<Array<Job>> => {
  const { data } = await axios.get(`${baseUrl}/jobs`);
  return data;
};

export const useJobs = () => {
  return useQuery({
    queryKey: ['jobs'],
    queryFn: fetchJobs,
  });
};
