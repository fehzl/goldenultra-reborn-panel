import {
  AccessDeniedError,
  UnexpectedError,
  UnprocessableEntityError,
} from '@/domain/errors';
import { SaveOrderItemSeparation } from '@/domain/usecases';
import { RemoteOrderItemModel } from '../models';
import { HttpClient, HttpCode } from '../protocols/http';

export class RemoteSaveOrderItemSepartion implements SaveOrderItemSeparation {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<RemoteSaveOrderItemSepartion.Model>,
  ) {}

  async save(
    params: SaveOrderItemSeparation.Params,
  ): Promise<SaveOrderItemSeparation.Model> {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: `PATCH`,
      body: params,
    });

    const remoteOrderItem = httpResponse.body as RemoteOrderItemModel;

    switch (httpResponse.httpCode) {
      case HttpCode.OK:
        return remoteOrderItem;
      case HttpCode.UNAUTHORIZED:
        throw new AccessDeniedError();
      case HttpCode.UNPROCESSABLE_ENTITY:
        throw new UnprocessableEntityError();
      default:
        throw new UnexpectedError();
    }
  }
}

export namespace RemoteSaveOrderItemSepartion {
  export type Model = RemoteOrderItemModel;
}
