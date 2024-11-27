import axios from 'axios';
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

class HttpService {
  private axiosInstance: AxiosInstance;

  constructor(baseURL: string) {
    this.axiosInstance = axios.create({
      baseURL,
    });
  }

  private async requestWithRetry<T>(
    method: 'get' | 'post' | 'put' | 'delete',
    url: string,
    data?: unknown,
    config: AxiosRequestConfig = {},
    maxRetries = 0
  ): Promise<AxiosResponse<T>> {
    let retries = 0;
    let lastError: unknown;

    while (retries <= maxRetries) {
      try {
        return await this.axiosInstance.request<T>({
          method,
          url,
          data,
          ...config,
        });
      } catch (error) {
        lastError = error;
        if (retries === maxRetries) {
          throw error;
        }
        retries++;
      }
    }

    throw lastError;
  }

  async get<T>(
    url: string,
    config: AxiosRequestConfig = {},
    maxRetries = 0,
    timeout?: number
  ): Promise<AxiosResponse<T>> {
    if (timeout !== undefined) {
      config.timeout = timeout;
    }
    return await this.requestWithRetry<T>('get', url, undefined, config, maxRetries);
  }

  async post<T, D = unknown>(
    url: string,
    data: D,
    config: AxiosRequestConfig = {},
    maxRetries = 0,
    timeout?: number
  ): Promise<AxiosResponse<T>> {
    if (timeout !== undefined) {
      config.timeout = timeout;
    }
    return await this.requestWithRetry<T>('post', url, data, config, maxRetries);
  }

  async put<T, D = unknown>(
    url: string,
    data: D,
    config: AxiosRequestConfig = {},
    maxRetries = 0,
    timeout?: number
  ): Promise<AxiosResponse<T>> {
    if (timeout !== undefined) {
      config.timeout = timeout;
    }
    return await this.requestWithRetry<T>('put', url, data, config, maxRetries);
  }

  async delete<T>(
    url: string,
    config: AxiosRequestConfig = {},
    maxRetries = 0,
    timeout?: number
  ): Promise<AxiosResponse<T>> {
    if (timeout !== undefined) {
      config.timeout = timeout;
    }
    return await this.requestWithRetry<T>('delete', url, undefined, config, maxRetries);
  }
}

const baseUrl = import.meta.env.VITE_API_URL;
const httpService = new HttpService(baseUrl);

export { httpService };