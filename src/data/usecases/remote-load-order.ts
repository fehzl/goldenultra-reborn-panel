import { AccessDeniedError, UnexpectedError } from '@/domain/errors';
import { LoadOrder } from '@/domain/usecases';
import { toTitleCase } from '@/presentation/utils/formatters';
import { RemoteOrderModel } from '../models/remote-order-model';
import { HttpClient, HttpCode } from '../protocols/http';

export class RemoteLoadOrder implements LoadOrder {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<RemoteLoadOrder.Model>,
  ) {}

  async load(code: string): Promise<LoadOrder.Model> {
    const httpResponse = await this.httpClient.request({
      url: `${this.url}/${code}`,
      method: `GET`,
    });

    const remoteLoadOrder = httpResponse?.body || ({} as RemoteLoadOrder.Model);

    switch (httpResponse.httpCode) {
      case HttpCode.OK:
        return {
          ...remoteLoadOrder,
          items: remoteLoadOrder.items.map((item) => {
            return {
              ...item,
              device: {
                ...item.device,
                code: item.device.code.toUpperCase(),
                exhibition_description: toTitleCase(
                  item.device.exhibition_description,
                ),
              },
            };
          }),
        };
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
