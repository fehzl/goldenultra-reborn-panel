import { OrderModel } from '../models/order-model';

export interface SaveOrder {
  save: (order: SaveOrder.Params) => Promise<SaveOrder.Model>;
}

export namespace SaveOrder {
  export type Params = {
    orderId: string;
    deviceId: string;
    price: number;
    amount: number;
    overall: number;
  };

  export type Model = OrderModel;
}
