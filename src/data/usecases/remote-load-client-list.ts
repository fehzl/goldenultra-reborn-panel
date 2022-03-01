import { AccessDeniedError, UnexpectedError } from '@/domain/errors';
import { LoadClientList } from '@/domain/usecases';
import { RemoteClientModel } from '../models';
import { HttpClient, HttpCode } from '../protocols/http';

export class RemoteLoadClientList implements LoadClientList {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<RemoteLoadClientList.Model[]>,
  ) {}

  async loadAll(params?: any): Promise<LoadClientList.Model[]> {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: `GET`,
      params,
    });

    const remoteLoadClientList = httpResponse.body || [];

    switch (httpResponse.httpCode) {
      case HttpCode.OK:
        return remoteLoadClientList;
      case HttpCode.NO_CONTENT:
        return [];
      case HttpCode.UNAUTHORIZED:
        throw new AccessDeniedError();
      default:
        throw new UnexpectedError();
    }
  }
}

export namespace RemoteLoadClientList {
  export type Model = RemoteClientModel;
}
