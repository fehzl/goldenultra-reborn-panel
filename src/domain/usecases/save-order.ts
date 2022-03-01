import { OrderModel } from '../models/order-model';

export interface SaveOrder {
  save: (order: SaveOrder.Params) => Promise<SaveOrder.Model>;
}

export namespace SaveOrder {
  export type Params = {
    clientId: string;
  };

  export type Model = OrderModel;
}
