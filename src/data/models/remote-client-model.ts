export type RemoteClientModel = {
  id: string;
  name: string;
  rg: string;
  cpf: string;
  person_type: string;
  address: RemoteClientAddressModel;
  phone: RemoteClientPhoneModel;
};

export type RemoteClientAddressModel = {
  id: string;
  address: string;
  state: string;
  city: string;
  zipcode: string;
};

export type RemoteClientPhoneModel = {
  id: string;
  phone: string;
  phone_type: string;
};
