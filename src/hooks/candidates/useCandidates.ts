import type { Candidate, MediaInterview } from '@/models/Candidate';
import { httpService } from '@/services/httpService';
import { useQuery } from '@tanstack/react-query';

const fetchCandidates = async (jobId: string): Promise<Array<Candidate>> => {
  const { data } = await httpService.get<Array<Candidate>>(
    `/meeting/getMeetingForJob/${jobId}`,
  );
  return data;
};

const fetchMeetingById = async (id: string): Promise<Candidate> => {
  const { data } = await httpService.get<Candidate>(
    `/meeting/getMeetingById/${id}`,
  );
  return data;
};

const postMediaFile = async (midiaEntrevista?: MediaInterview): Promise<Blob> => {
  const { data, headers } = await httpService.post<Blob>(
    '/meeting/getMediaFile',
    { fileUrl: midiaEntrevista || undefined },
    { responseType: 'blob' }
  );
  const mimeType = headers['content-type'];
  return new Blob([data], { type: mimeType });
};

export const useCandidates = (jobId: string) => {
  return useQuery({
    queryKey: ['candidates', jobId],
    queryFn: () => fetchCandidates(jobId),
  });
};

export const useMeetingById = (id: string) => {
  return useQuery({
    queryKey: ['meeting', id],
    queryFn: () => fetchMeetingById(id),
  });
};

export const useMediaFile = (midiaEntrevista: MediaInterview) => {
  return useQuery({
    queryKey: ['media', midiaEntrevista],
    queryFn: () => postMediaFile(midiaEntrevista),
  });
};
