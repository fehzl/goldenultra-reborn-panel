import {
  AccessDeniedError,
  UnexpectedError,
  UnprocessableEntityError,
} from '@/domain/errors';
import { SaveOrder } from '@/domain/usecases';
import { RemoteOrderModel } from '../models';
import { HttpClient, HttpCode } from '../protocols/http';

export class RemoteSaveOrder implements SaveOrder {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<RemoteSaveOrder.Model>,
  ) {}

  async save(params: SaveOrder.Params): Promise<SaveOrder.Model> {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: `POST`,
      body: params,
    });

    const remoteOrder = httpResponse.body as RemoteOrderModel;

    switch (httpResponse.httpCode) {
      case HttpCode.CREATED:
        return remoteOrder;
      case HttpCode.FORBIDDEN:
        throw new AccessDeniedError();
      case HttpCode.UNPROCESSABLE_ENTITY:
        throw new UnprocessableEntityError();
      default:
        throw new UnexpectedError();
    }
  }
}

export namespace RemoteSaveOrder {
  export type Model = RemoteOrderModel;
}
