import { HttpClient } from '@/data/protocols/http';
import { AuthorizeHttpClientDecorator } from '@/main/decorators';
import { makeAxiosHttpClientAdapter } from '../http';

export const makeAuthorizeHttpClientDecorator = (): HttpClient =>
  new AuthorizeHttpClientDecorator(
    makeAxiosHttpClientAdapter(),
    `MQ.FHJzNDR3qfrlL8lRWs_WjWg4UAdAUpcKidHTY3S6xPFs7byU0JKjh1c5xEQB`,
  );
