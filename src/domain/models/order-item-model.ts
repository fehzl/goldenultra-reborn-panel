import { DeviceModel } from '.';

export type OrderItemModel = {
  id: string;
  price: number;
  amount: number | null;
  discount: number;
  overall: number;
  separated: boolean;
  amount_separated: number;
  device: DeviceModel;
};
