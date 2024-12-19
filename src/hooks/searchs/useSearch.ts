// src/hooks/searchs/useSearch.ts
import { httpService } from '@/services/httpService';
import { useQuery } from '@tanstack/react-query';

const smartSearch = async <T>(
  dados: Array<T>,
  pesquisa: string,
  modelo?: string,
): Promise<object> => {
  const payload = modelo ? { dados, pesquisa, modelo } : { dados, pesquisa };
  const response = await httpService.post<object>(
    '/gemini/smartSearch',
    payload,
  );
  return response.data;
};

export const useSmartSearch = <T>(
  dados: Array<T>,
  pesquisa: string,
  modelo?: string,
) => {
  return useQuery({
    queryKey: ['smartSearch', dados, pesquisa, modelo],
    queryFn: () => smartSearch(dados, pesquisa, modelo),
  });
};
