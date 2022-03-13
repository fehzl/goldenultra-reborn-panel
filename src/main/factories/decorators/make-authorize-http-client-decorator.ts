import { HttpClient } from '@/data/protocols/http';
import { AuthorizeHttpClientDecorator } from '@/main/decorators';
import { makeAxiosHttpClientAdapter } from '../http';

export const makeAuthorizeHttpClientDecorator = (): HttpClient =>
  new AuthorizeHttpClientDecorator(
    makeAxiosHttpClientAdapter(),
    `MQ.dv8BiTkP1tQKxXKlPxhEqQcYAvoTBp1khj0haPmiJoY00R6iGww6KyewJNg1`,
  );
