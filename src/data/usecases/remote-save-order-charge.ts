import {
  AccessDeniedError,
  UnexpectedError,
  UnprocessableEntityError,
} from '@/domain/errors';
import { SaveOrderCharge } from '@/domain/usecases';
import { RemoteChargeModel } from '../models';
import { HttpClient, HttpCode } from '../protocols/http';

export class RemoteSaveOrderCharge implements SaveOrderCharge {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<RemoteSaveOrderCharge.Model>,
  ) {}

  async save(params: SaveOrderCharge.Params): Promise<SaveOrderCharge.Model> {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: `POST`,
      body: params,
    });

    const remoteOrderCharge = httpResponse.body as RemoteChargeModel;

    switch (httpResponse.httpCode) {
      case HttpCode.CREATED:
        return remoteOrderCharge;
      case HttpCode.FORBIDDEN:
        throw new AccessDeniedError();
      case HttpCode.UNPROCESSABLE_ENTITY:
        throw new UnprocessableEntityError();
      default:
        throw new UnexpectedError();
    }
  }
}

export namespace RemoteSaveOrderCharge {
  export type Model = {
    id: string;
  };
}
