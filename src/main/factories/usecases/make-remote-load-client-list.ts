import { RemoteLoadClientList } from '@/data/usecases';
import { LoadClientList } from '@/domain/usecases';
import { makeApiUrl, makeAxiosHttpClientAdapter } from '../http';

export const makeRemoteLoadClientList = (): LoadClientList =>
  new RemoteLoadClientList(
    makeApiUrl(`/clients`),
    makeAxiosHttpClientAdapter(),
  );
