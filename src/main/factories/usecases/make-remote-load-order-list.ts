import { RemoteLoadOrderList } from '@/data/usecases';
import { LoadOrderList } from '@/domain/usecases';
import { makeAuthorizeHttpClientDecorator } from '../decorators/make-authorize-http-client-decorator';
import { makeApiUrl } from '../http';

export const makeRemoteLoadOrderList = (): LoadOrderList =>
  new RemoteLoadOrderList(
    makeApiUrl(`/orders`),
    makeAuthorizeHttpClientDecorator(),
  );
