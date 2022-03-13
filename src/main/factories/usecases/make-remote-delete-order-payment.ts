import { RemoteDeleteOrderPayment } from '@/data/usecases';
import { DeleteOrderPayment } from '@/domain/usecases';
import { makeAuthorizeHttpClientDecorator } from '../decorators/make-authorize-http-client-decorator';
import { makeApiUrl } from '../http';

export const makeRemoteDeleteOrderPayment = (): DeleteOrderPayment => {
  return new RemoteDeleteOrderPayment(
    makeApiUrl(`/orders/payments`),
    makeAuthorizeHttpClientDecorator(),
  );
};
