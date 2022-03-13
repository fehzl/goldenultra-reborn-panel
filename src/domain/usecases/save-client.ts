import { ClientModel } from '../models';

export interface SaveClient {
  save: (client: SaveClient.Params) => Promise<SaveClient.Model>;
}

export namespace SaveClient {
  export type Params = {
    name: string;
    email: string;
    type: string;
    RG?: string;
    IE?: string;
    CPF?: string;
    CNPJ?: string;
    phone: {
      number: string;
      type: string;
      isPrimary: boolean;
    };
    address: {
      CEP: string;
      type: string;
      street: string;
      number: string;
      complement: string;
      neighborhood: string;
      city: string;
      UF: string;
      reference: string;
      isPrimary: boolean;
    };
  };

  export type Model = ClientModel;
}
