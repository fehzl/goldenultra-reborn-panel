import { AccessDeniedError, UnexpectedError } from '@/domain/errors';
import { LoadDeviceList } from '@/domain/usecases';
import { RemoteDeviceModel } from '../models';
import { HttpClient, HttpCode } from '../protocols/http';

export class RemoteLoadDeviceList implements LoadDeviceList {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<RemoteLoadDeviceList.Model[]>,
  ) {}

  async loadAll(params?: any): Promise<LoadDeviceList.Model[]> {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: `GET`,
      params,
    });

    const remoteLoadDeviceList = httpResponse.body || [];

    switch (httpResponse.httpCode) {
      case HttpCode.OK:
        return remoteLoadDeviceList;
      case HttpCode.NO_CONTENT:
        return [];
      case HttpCode.UNAUTHORIZED:
        throw new AccessDeniedError();
      default:
        throw new UnexpectedError();
    }
  }
}

export namespace RemoteLoadDeviceList {
  export type Model = RemoteDeviceModel;
}
