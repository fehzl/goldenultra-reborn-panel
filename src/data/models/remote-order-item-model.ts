import { RemoteDeviceModel } from './remote-device-model';

export type RemoteOrderItemModel = {
  id: number;
  price: number;
  amount: number;
  discount: number;
  overall: number;
  amount_separated: number;
  device: RemoteDeviceModel;
};
