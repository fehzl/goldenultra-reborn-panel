import { RemoteLoadDeviceList } from '@/data/usecases';
import { LoadDeviceList } from '@/domain/usecases';
import { makeApiUrl, makeAxiosHttpClientAdapter } from '../http';

export const makeRemoteLoadDeviceList = (): LoadDeviceList =>
  new RemoteLoadDeviceList(
    makeApiUrl(`/devices`),
    makeAxiosHttpClientAdapter(),
  );
