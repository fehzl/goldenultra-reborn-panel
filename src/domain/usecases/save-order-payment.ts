import { PaymentModel } from '../models';

export interface SaveOrderPayment {
  save: (payment: SaveOrderPayment.Params) => Promise<SaveOrderPayment.Model>;
}

export namespace SaveOrderPayment {
  export type Params = {
    orderId: string;
    method: string;
    value: number;
    situation: string;
    identifier: string;
  };

  export type Model = PaymentModel;
}
