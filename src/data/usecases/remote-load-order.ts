import { AccessDeniedError, UnexpectedError } from '@/domain/errors';
import { LoadOrder } from '@/domain/usecases';
import { RemoteOrderModel } from '../models/remote-order-model';
import { HttpClient, HttpCode } from '../protocols/http';

export class RemoteLoadOrder implements LoadOrder {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<RemoteLoadOrder.Model>,
  ) {}

  async load(code: string): Promise<RemoteLoadOrder.Model> {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: `GET`,
      params: { code },
    });

    const remoteLoadOrder = httpResponse?.body || ({} as RemoteLoadOrder.Model);

    switch (httpResponse.httpCode) {
      case HttpCode.OK:
        return remoteLoadOrder;
      case HttpCode.FORBIDDEN:
        throw new AccessDeniedError();
      default:
        throw new UnexpectedError();
    }
  }
}

export namespace RemoteLoadOrder {
  export type Model = RemoteOrderModel;
}
