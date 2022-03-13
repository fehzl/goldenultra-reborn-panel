import {
  RemoteEmployeeModel,
  RemotePaymentModel,
  RemoteChargeModel,
  RemoteOrderItemModel,
  RemoteClientModel,
} from '.';

export type RemoteOrderModel = {
  id: string;
  code: string;
  situation: string;
  created_at: Date;
  updated_at: Date;
  employee: RemoteEmployeeModel;
  payments: RemotePaymentModel[];
  charges: RemoteChargeModel[];
  items: RemoteOrderItemModel[];
  client: RemoteClientModel;
  items_price_sum: number;
  items_discount_sum: number;
  charges_sum: number;
  order_price_overall: number;
};
