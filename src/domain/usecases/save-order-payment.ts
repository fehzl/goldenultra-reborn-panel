import { PaymentModel } from '../models';

export interface SaveOrderPayment {
  save: (payment: SaveOrderPayment.Params) => Promise<SaveOrderPayment.Model>;
}

export namespace SaveOrderPayment {
  export type Params = {
    orderId: string;
    method: string;
    amount: number;
    situation: string;
    identifier: string;
    observation: string;
  };

  export type Model = PaymentModel;
}
