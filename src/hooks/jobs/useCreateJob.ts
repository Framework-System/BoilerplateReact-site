import type { Job } from '@/models/Job';
import { httpService } from '@/services/httpService';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const createJob = async (jobData: Partial<Job>): Promise<Job> => {
  const { data } = await httpService.post<Job>(
    '/meeting/v2/createOrUpdateJobSkills',
    jobData,
  );
  return data;
};

const updateJobStatus = async (id: string, status: string): Promise<Job> => {
  const { data } = await httpService.put<Job>(`/meeting/job/${id}/status`, { status });
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

export const useUpdateJobStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) => updateJobStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
    },
  });
};