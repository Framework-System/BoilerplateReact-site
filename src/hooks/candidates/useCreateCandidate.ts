import type { Candidate } from '@/models/Candidate';
import { httpService } from '@/services/httpService';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const createCandidate = async (
  candidateData: Partial<Candidate>,
): Promise<Candidate> => {
  const { data } = await httpService.post<Candidate>(
    '/candidates',
    candidateData,
  );
  return data;
};

const updateMeetingStatus = async (id: string, status: string): Promise<void> => {
  await httpService.put(`/meeting/updateMeetingStatus/${id}/status`, { status });
};

export const useCreateCandidate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCandidate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['candidates'] });
    },
  });
};

export const useUpdateMeetingStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) => updateMeetingStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['meetings'] });
    },
  });
};
