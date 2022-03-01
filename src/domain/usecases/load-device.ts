import { DeviceModel } from '../models';

export interface LoadDevice {
  load(code: string): Promise<LoadDevice.Model | null>;
}

export namespace LoadDevice {
  export type Model = DeviceModel;
}
