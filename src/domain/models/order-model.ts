import {
  ChargeModel,
  ClientModel,
  EmployeeModel,
  DeviceModel,
  PaymentModel,
} from '.';

export type Item = {
  id: string;
  price: number;
  amount: number;
  discount: number;
  overall: number;
  amount_separated: number;
  device: DeviceModel;
};

export type OrderModel = {
  id: string;
  code: string;
  situation: string;
  created_at: Date;
  updated_at: Date;
  employee: EmployeeModel;
  payments: PaymentModel[];
  charges: ChargeModel[];
  items: Item[];
  client: ClientModel;
  items_price_sum: number;
  items_discount_sum: number;
  charges_sum: number;
  order_price_overall: number;
};
