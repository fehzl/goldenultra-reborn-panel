import { DeviceModel } from '../models';

export interface LoadDeviceList {
  loadAll(params?: any): Promise<LoadDeviceList.Model[]>;
}

export namespace LoadDeviceList {
  export type Model = DeviceModel;
}
