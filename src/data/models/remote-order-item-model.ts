import { RemoteDeviceModel } from './remote-device-model';
import { RemoteEmployeeModel } from './remote-employee-model';

export type RemoteOrderItemModel = {
  id: string;
  price: number;
  amount: number;
  discount: number;
  overall: number;
  separated: boolean;
  separated_by: RemoteEmployeeModel;
  separated_at: Date;
  amount_separated: number;
  device: RemoteDeviceModel;
};
