export interface DeleteOrderCharge {
  delete: (params: DeleteOrderCharge.Params) => Promise<any>;
}

export namespace DeleteOrderCharge {
  export type Params = {
    id: string;
  };
}
