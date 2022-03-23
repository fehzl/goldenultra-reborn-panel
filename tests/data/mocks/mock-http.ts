import { HttpClient, HttpRequest, HttpResponse } from '@/data/protocols/http';
import faker from '@faker-js/faker';

export const mockHttpRequest = (): HttpRequest => ({
  url: faker.internet.url(),
  method: faker.random.arrayElement([`GET`, `POST`, `PUT`, `DELETE`]),
  body: faker.random.objectElement({
    keyA: faker.random.word(),
    keyB: faker.random.number(),
  }),
});

export class HttpClientSpy<R = any> implements HttpClient<R> {
  url?: string;
  method?: string;
  body?: any;
  response: HttpResponse<R> = {
    httpCode: 200,
    message: faker.random.word(),
  };

  async request(data: HttpRequest): Promise<HttpResponse<R>> {
    this.url = data.url;
    this.method = data.method;
    this.body = data.body;
    return this.response;
  }
}
