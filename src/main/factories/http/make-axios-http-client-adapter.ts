import { AxiosHttpClientAdapter } from '@/infra/http/axios-http-client-adapter';

export const makeAxiosHttpClientAdapter = (): AxiosHttpClientAdapter =>
  new AxiosHttpClientAdapter();
