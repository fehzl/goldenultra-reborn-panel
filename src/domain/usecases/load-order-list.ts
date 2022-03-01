import { OrderModel } from '../models/order-model';

export interface LoadOrderList {
  loadAll(): Promise<LoadOrderList.Model[]>;
}

export namespace LoadOrderList {
  export type Model = OrderModel;
}
