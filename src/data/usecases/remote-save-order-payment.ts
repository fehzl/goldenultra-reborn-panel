import {
  AccessDeniedError,
  UnexpectedError,
  UnprocessableEntityError,
} from '@/domain/errors';
import { SaveOrderPayment } from '@/domain/usecases';
import { RemotePaymentModel } from '../models';
import { HttpClient, HttpCode } from '../protocols/http';

export class RemoteSaveOrderPayment implements SaveOrderPayment {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<RemoteSaveOrderPayment.Model>,
  ) {}

  async save(params: SaveOrderPayment.Params): Promise<SaveOrderPayment.Model> {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: `POST`,
      body: params,
    });

    const remoteOrderPayment = httpResponse.body as RemotePaymentModel;

    switch (httpResponse.httpCode) {
      case HttpCode.CREATED:
        return remoteOrderPayment;
      case HttpCode.FORBIDDEN:
        throw new AccessDeniedError();
      case HttpCode.UNPROCESSABLE_ENTITY:
        throw new UnprocessableEntityError();
      default:
        throw new UnexpectedError();
    }
  }
}

export namespace RemoteSaveOrderPayment {
  export type Model = {
    id: string;
  };
}
