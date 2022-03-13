export interface DeleteOrderPayment {
  delete: (params: DeleteOrderPayment.Params) => Promise<any>;
}

export namespace DeleteOrderPayment {
  export type Params = {
    id: string;
  };
}
