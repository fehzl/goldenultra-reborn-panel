import { AccessDeniedError, UnexpectedError } from '@/domain/errors';
import { LoadOrderList } from '@/domain/usecases';
import { RemoteOrderModel } from '../models';
import { HttpClient, HttpCode } from '../protocols/http';

export class RemoteLoadOrderList implements LoadOrderList {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<RemoteLoadOrderList.Model[]>,
  ) {}

  async loadAll(): Promise<LoadOrderList.Model[]> {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: `GET`,
    });

    const remoteLoadOrderList = httpResponse.body || [];

    switch (httpResponse.httpCode) {
      case HttpCode.OK:
        return remoteLoadOrderList;
      case HttpCode.NO_CONTENT:
        return [];
      case HttpCode.UNAUTHORIZED:
        throw new AccessDeniedError();
      default:
        throw new UnexpectedError();
    }
  }
}

export namespace RemoteLoadOrderList {
  export type Model = RemoteOrderModel;
}
