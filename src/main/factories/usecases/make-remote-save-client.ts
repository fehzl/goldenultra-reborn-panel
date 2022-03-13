import { RemoteSaveClient } from '@/data/usecases';
import { SaveClient } from '@/domain/usecases';
import { makeAuthorizeHttpClientDecorator } from '../decorators/make-authorize-http-client-decorator';
import { makeApiUrl } from '../http';

export const makeRemoteSaveClient = (): SaveClient =>
  new RemoteSaveClient(
    makeApiUrl(`/clients`),
    makeAuthorizeHttpClientDecorator(),
  );
