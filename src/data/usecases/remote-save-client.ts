import {
  AccessDeniedError,
  UnexpectedError,
  UnprocessableEntityError,
} from '@/domain/errors';
import { SaveClient } from '@/domain/usecases';
import { RemoteClientModel } from '../models';
import { HttpClient, HttpCode } from '../protocols/http';

export class RemoteSaveClient implements SaveClient {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<RemoteSaveClient.Model>,
  ) {}

  async save(params: SaveClient.Params): Promise<SaveClient.Model> {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: `POST`,
      body: params,
    });

    const remoteClient = httpResponse.body as RemoteClientModel;

    switch (httpResponse.httpCode) {
      case HttpCode.CREATED:
        return remoteClient;
      case HttpCode.FORBIDDEN:
        throw new AccessDeniedError();
      case HttpCode.UNPROCESSABLE_ENTITY:
        throw new UnprocessableEntityError();
      default:
        throw new UnexpectedError();
    }
  }
}

export namespace RemoteSaveClient {
  export type Model = RemoteClientModel;
}
