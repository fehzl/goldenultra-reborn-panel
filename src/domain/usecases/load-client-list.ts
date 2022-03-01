import { ClientModel } from '../models';

export interface LoadClientList {
  loadAll(params?: any): Promise<LoadClientList.Model[]>;
}

export namespace LoadClientList {
  export type Model = ClientModel;
}
