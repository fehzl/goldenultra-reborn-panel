import { HttpClient, HttpRequest, HttpResponse } from '@/data/protocols/http';

export class AuthorizeHttpClientDecorator implements HttpClient {
  constructor(
    private readonly httpClient: HttpClient,
    private readonly accessToken: string | undefined,
  ) {}

  async request(data: HttpRequest): Promise<HttpResponse> {
    if (this.accessToken) {
      Object.assign(data, {
        headers: Object.assign(data.headers || {}, {
          Authorization: `Bearer ${this.accessToken}`,
        }),
      });
    }

    return this.httpClient.request(data);
  }
}
