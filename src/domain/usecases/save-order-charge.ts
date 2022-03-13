import { ChargeModel } from '../models';

export interface SaveOrderCharge {
  save: (charge: SaveOrderCharge.Params) => Promise<SaveOrderCharge.Model>;
}

export namespace SaveOrderCharge {
  export type Params = Omit<ChargeModel, 'id' | 'created_at' | 'updated_at'>;

  export type Model = ChargeModel;
}
