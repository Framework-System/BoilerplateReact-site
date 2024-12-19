import { useMutation } from '@tanstack/react-query';
import { httpService } from '@/services/httpService';

interface LoginData {
  email: string;
  senha: string;
}

interface LoginResponse {
  message: string;
  token: string;
}

interface DecodeTokenData {
  token: string;
}

interface DecodeTokenResponse {
  payload: {
    id: string;
    email: string;
    name: string;
    permissions: Array<string>;
    iat: number;
    exp: number;
    company?: string;
  };
}

const login = async (loginData: LoginData): Promise<LoginResponse> => {
  const { data } = await httpService.post<LoginResponse>('/user/login', loginData);
  return data;
};

const decodeToken = async (data: DecodeTokenData): Promise<DecodeTokenResponse> => {
  const { data: responseData } = await httpService.post<DecodeTokenResponse>('/user/decodeToken', data);
  return responseData;
};

export const useLogin = () => {
  return useMutation({
    mutationFn: login,
  });
};

export const useDecodeToken = () => {
  return useMutation({
    mutationFn: decodeToken,
  });
};