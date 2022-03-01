export type ClientModel = {
  id: string;
  name: string;
  rg: string;
  cpf: string;
  person_type: string;
  address: ClientAddressModel;
  phone: ClientPhoneModel;
};

export type ClientAddressModel = {
  id: string;
  address: string;
  state: string;
  city: string;
  zipcode: string;
};

export type ClientPhoneModel = {
  id: string;
  phone: string;
  phone_type: string;
};
