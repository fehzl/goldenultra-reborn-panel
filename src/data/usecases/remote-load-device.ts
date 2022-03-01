import { AccessDeniedError, UnexpectedError } from '@/domain/errors';
import { LoadDevice } from '@/domain/usecases';
import { RemoteDeviceModel } from '../models';
import { HttpClient, HttpCode } from '../protocols/http';

export class RemoteLoadDevice implements LoadDevice {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<RemoteLoadDevice.Model>,
  ) {}

  async load(code: string): Promise<RemoteLoadDevice.Model> {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: `GET`,
      params: { code },
    });

    const remoteLoadDevice =
      httpResponse?.body || ({} as RemoteLoadDevice.Model);

    switch (httpResponse.httpCode) {
      case HttpCode.OK:
        return remoteLoadDevice;
      case HttpCode.FORBIDDEN:
        throw new AccessDeniedError();
      default:
        throw new UnexpectedError();
    }
  }
}

export namespace RemoteLoadDevice {
  export type Model = RemoteDeviceModel;
}
