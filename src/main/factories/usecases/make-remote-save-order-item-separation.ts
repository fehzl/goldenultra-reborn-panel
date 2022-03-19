import { RemoteSaveOrderItemSepartion } from '@/data/usecases';
import { SaveOrderItemSeparation } from '@/domain/usecases';
import { makeAuthorizeHttpClientDecorator } from '../decorators/make-authorize-http-client-decorator';
import { makeApiUrl } from '../http';

export const makeRemoteSaveOrderItemSeparation =
  (): SaveOrderItemSeparation => {
    return new RemoteSaveOrderItemSepartion(
      makeApiUrl(`/orders/separations`),
      makeAuthorizeHttpClientDecorator(),
    );
  };
