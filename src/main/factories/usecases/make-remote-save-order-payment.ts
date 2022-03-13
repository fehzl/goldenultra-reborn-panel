import { RemoteSaveOrderPayment } from '@/data/usecases/remote-save-order-payment';
import { SaveOrderPayment } from '@/domain/usecases';
import { makeAuthorizeHttpClientDecorator } from '../decorators/make-authorize-http-client-decorator';
import { makeApiUrl } from '../http';

export const makeRemoteSaveOrderPayment = (): SaveOrderPayment =>
  new RemoteSaveOrderPayment(
    makeApiUrl(`/orders/payments`),
    makeAuthorizeHttpClientDecorator(),
  );
