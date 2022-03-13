import { AccessDeniedError, UnexpectedError } from '@/domain/errors';
import { DeleteOrderPayment } from '@/domain/usecases';
import { HttpClient, HttpCode } from '../protocols/http';

export class RemoteDeleteOrderPayment implements DeleteOrderPayment {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<any>,
  ) {}

  async delete(params: DeleteOrderPayment.Params): Promise<any> {
    const httpResponse = await this.httpClient.request({
      url: `${this.url}/${params.id}`,
      method: `DELETE`,
    });

    switch (httpResponse.httpCode) {
      case HttpCode.OK:
        return httpResponse.body;
      case HttpCode.NO_CONTENT:
        return;
      case HttpCode.UNAUTHORIZED:
        throw new AccessDeniedError();
      default:
        throw new UnexpectedError();
    }
  }
}
