export interface LoadOrder {
  load(code: string): Promise<LoadOrder.Model | null>;
}

export namespace LoadOrder {
  export type Model = {
    id: string;
    code: string;
  };
}
