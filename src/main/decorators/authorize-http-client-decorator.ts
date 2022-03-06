import { HttpClient, HttpRequest, HttpResponse } from '@/data/protocols/http';

export class AuthorizeHttpClientDecorator implements HttpClient {
  constructor(private readonly httpClient: HttpClient) {}

  async request(data: HttpRequest): Promise<HttpResponse> {
    const account = {
      id: `any_id`,
      name: `any_name`,
      accessToken: `MQ.k9p_nmB9ukmARPj7GZ8CVx9WedPDvKPcrZPNxNvtHydsfGpO-Jduy_zlnMyB`,
    };

    if (account.accessToken) {
      Object.assign(data, {
        headers: Object.assign(data.headers || {}, {
          Authorization: `Bearer ${account.accessToken}`,
        }),
      });
    }

    return this.httpClient.request(data);
  }
}
