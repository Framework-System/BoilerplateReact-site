import { httpService } from '@/services/httpService';
import { useQuery } from '@tanstack/react-query';

const fetchCompanyNames = async (): Promise<Array<string>> => {
  const { data } = await httpService.get<Array<string>>(
    '/meeting/getAllEmpresas',
  );
  return data;
};

export const useCompanyNames = () => {
  return useQuery({
    queryKey: ['companyNames'],
    queryFn: fetchCompanyNames,
  });
};
