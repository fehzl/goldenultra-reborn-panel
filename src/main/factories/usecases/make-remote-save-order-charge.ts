import { RemoteSaveOrderCharge } from '@/data/usecases';
import { SaveOrderCharge } from '@/domain/usecases';
import { makeAuthorizeHttpClientDecorator } from '../decorators/make-authorize-http-client-decorator';
import { makeApiUrl } from '../http';

export const makeRemoteSaveOrderCharge = (): SaveOrderCharge => {
  return new RemoteSaveOrderCharge(
    makeApiUrl(`/orders/charges`),
    makeAuthorizeHttpClientDecorator(),
  );
};
