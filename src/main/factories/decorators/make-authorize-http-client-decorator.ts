import { HttpClient } from '@/data/protocols/http';
import { AuthorizeHttpClientDecorator } from '@/main/decorators';
import { makeAxiosHttpClientAdapter } from '../http';

export const makeAuthorizeHttpClientDecorator = (): HttpClient =>
  new AuthorizeHttpClientDecorator(
    makeAxiosHttpClientAdapter(),
    `MQ.wNXBRnqUnvjfGLTyaos7n_s_hd8_H8B8ekhVFyW7wuAbozZqNv0cEEMTFs5J`,
  );
