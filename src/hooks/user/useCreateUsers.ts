import { useMutation, useQueryClient } from '@tanstack/react-query';
import { httpService } from '@/services/httpService';
import type { User } from '@/models/User';

interface UpdateUserData {
  id: string;
  senha?: string;
  permissao?: string;
  acessoPermitido?: boolean;
  senhaAntiga?: string;
}

const updateUser = async (userData: UpdateUserData): Promise<User> => {
  const { id, ...data } = userData;
  const response = await httpService.put<User>(`/user/update/${id}`, data);
  return response.data;
};

export const useCreateUsers = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
};