import { RemoteDeviceModel } from './remote-device-model';

export type RemoteOrderItemModel = {
  id: string;
  price: number;
  amount: number;
  discount: number;
  overall: number;
  separated: boolean;
  amount_separated: number;
  device: RemoteDeviceModel;
};
