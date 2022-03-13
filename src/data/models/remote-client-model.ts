type Address = {
  id: string;
  client_id: string;
  street: string;
  number: string;
  complement: string;
  reference: string;
  neighborhood: string;
  city: string;
  uf: string;
  cep: string;
  type: string;
  is_primary: boolean;
  created_at: Date;
  updated_at: Date;
};

type Phone = {
  id: string;
  client_id: string;
  number: string;
  type: string;
  is_primary: boolean;
  created_at: Date;
  updated_at: Date;
};

export type RemoteClientModel = {
  id: string;
  user_id: string;
  name: string;
  email: string;
  type: string;
  cnpj?: any;
  cpf: string;
  rg: string;
  ie?: any;
  is_enabled: boolean;
  created_at: Date;
  updated_at: Date;
  address: Address;
  phone: Phone;
};
