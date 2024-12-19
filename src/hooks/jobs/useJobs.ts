import type { Job } from '@/models/Job';
import { httpService } from '@/services/httpService';
import { useQuery } from '@tanstack/react-query';

const fetchJobs = async (): Promise<Array<Job>> => {
  const { data } = await httpService.get<Array<Job>>(
    '/meeting/v2/getJobSkills',
  );

  return data;
};

const fetchJobSkillsById = async (id: string): Promise<Job> => {
  const { data } = await httpService.get<Job>(`/meeting/getJobSkillsById/${id}`);
  return data;
};

export const useJobs = () => {
  return useQuery({
    queryKey: ['jobs'],
    queryFn: fetchJobs,
  });
};

export const useJobSkillsById = (id: string) => {
  return useQuery({
    queryKey: ['jobSkills', id],
    queryFn: () => fetchJobSkillsById(id),
  });
};
