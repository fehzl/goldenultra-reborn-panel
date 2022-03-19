import { OrderItemModel } from '../models';

export interface SaveOrderItemSeparation {
  save: (
    params: SaveOrderItemSeparation.Params,
  ) => Promise<SaveOrderItemSeparation.Model>;
}

export namespace SaveOrderItemSeparation {
  export type Params = {
    id: string;
  };

  export type Model = OrderItemModel;
}
