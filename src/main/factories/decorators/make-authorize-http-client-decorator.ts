import { HttpClient } from '@/data/protocols/http';
import { AuthorizeHttpClientDecorator } from '@/main/decorators';
import { makeAxiosHttpClientAdapter } from '../http';

export const makeAuthorizeHttpClientDecorator = (): HttpClient =>
  new AuthorizeHttpClientDecorator(makeAxiosHttpClientAdapter());
