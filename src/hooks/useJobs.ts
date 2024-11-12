import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Job } from '../types';

const fetchJobs = async (): Promise<Job[]> => {
  const { data } = await axios.get('https://6733aacfa042ab85d1179d1b.mockapi.io/api/v1/jobs');
  return data;
};

export const useJobs = () => {
  return useQuery({
    queryKey: ['jobs'],
    queryFn: fetchJobs,
  });
};