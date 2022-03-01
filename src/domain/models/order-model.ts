import { ClientModel, EmployeeModel } from '.';

export type OrderModel = {
  id: string;
  code: string;
  status: string;
  client: ClientModel;
  employee: EmployeeModel;
  device: OrderItemDeviceModel;
  payments: OrderItemPaymentModel[];
  items: OrderItemModel[];
  total: number;
  created_at: string;
  updated_at: string;
};

export type OrderItemModel = {
  id: string;
  device: OrderItemDeviceModel;
  quantity: number;
  price: number;
};

export type OrderItemDeviceModel = {
  id: string;
  code: string;
  exhibition_description: string;
  un_price: number;
  alias: string;
};

export type OrderEmployeeModel = {
  id: string;
  email: string;
};

export type OrderItemPaymentModel = {
  id: string;
};
