import { RemoteClientModel, RemoteEmployeeModel } from '.';

export type RemoteOrderModel = {
  id: string;
  code: string;
  status: string;
  client: RemoteClientModel;
  employee: RemoteEmployeeModel;
  device: RemoteOrderItemDeviceModel;
  payments: RemoteOrderItemPaymentModel[];
  items: RemoteOrderItemModel[];
  total: number;
  created_at: string;
  updated_at: string;
};

export type RemoteOrderItemModel = {
  id: string;
  device: RemoteOrderItemDeviceModel;
  quantity: number;
  device_price: number;
  price: number;
};

export type RemoteOrderItemDeviceModel = {
  id: string;
  code: string;
  exhibition_description: string;
  un_price: number;
  alias: string;
};

export type RemoteOrderEmployeeModel = {
  id: string;
  email: string;
};

export type RemoteOrderItemPaymentModel = {
  id: string;
};
