import { RemoteLoadOrder } from '@/data/usecases';
import { LoadOrder } from '@/domain/usecases';
import { makeAuthorizeHttpClientDecorator } from '../decorators/make-authorize-http-client-decorator';
import { makeApiUrl } from '../http';

export const makeRemoteLoadOrder = (): LoadOrder => {
  return new RemoteLoadOrder(
    makeApiUrl(`/orders`),
    makeAuthorizeHttpClientDecorator(),
  );
};
