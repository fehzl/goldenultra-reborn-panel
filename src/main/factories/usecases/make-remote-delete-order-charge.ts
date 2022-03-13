import { RemoteDeleteOrderCharge } from '@/data/usecases';
import { DeleteOrderCharge } from '@/domain/usecases';
import { makeAuthorizeHttpClientDecorator } from '../decorators/make-authorize-http-client-decorator';
import { makeApiUrl } from '../http';

export const makeRemoteDeleteOrderCharge = (): DeleteOrderCharge => {
  return new RemoteDeleteOrderCharge(
    makeApiUrl(`/orders/charges`),
    makeAuthorizeHttpClientDecorator(),
  );
};
