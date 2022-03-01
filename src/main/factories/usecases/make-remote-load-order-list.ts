import { RemoteLoadOrderList } from '@/data/usecases';
import { LoadOrderList } from '@/domain/usecases';
import { makeApiUrl, makeAxiosHttpClientAdapter } from '../http';

export const makeRemoteLoadOrderList = (): LoadOrderList =>
  new RemoteLoadOrderList(makeApiUrl(`/orders`), makeAxiosHttpClientAdapter());
