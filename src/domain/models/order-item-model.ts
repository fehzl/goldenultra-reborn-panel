import { DeviceModel } from '.';

export type OrderItemModel = {
  id: number;
  price: number;
  amount: number | null;
  discount: number;
  overall: number;
  amount_separated: number;
  device: DeviceModel;
};
