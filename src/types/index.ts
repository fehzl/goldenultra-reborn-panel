export type Employee = {
  id: string;
  email: string;
  created_at: Date;
  updated_at: Date;
};

export type Address = {
  id: string;
  client_id: string;
  address: string;
  city: string;
  state: string;
  zipcode: string;
  address_type: string;
  is_primary: boolean;
  created_at: Date;
  updated_at: Date;
};

export type Phone = {
  id: string;
  client_id: string;
  phone: string;
  phone_type: string;
  is_primary: boolean;
  created_at: Date;
  updated_at: Date;
};

export type Client = {
  id: string;
  user_id: string;
  name: string;
  person_type: string;
  cnpj?: any;
  cpf: string;
  rg: string;
  ie?: any;
  created_at: Date;
  updated_at: Date;
  address: Address;
  phone: Phone;
};

export type Device = {
  id: string;
  alias: string;
  code: string;
  un_in_a_box: number;
  net_weight: number;
  gross_weight: number;
  exhibition_description: string;
  detailed_description: string;
  images: string;
  available_to_sell: boolean;
  un_price: number;
  box_price: number;
  un_avaliable_to_sell: number;
  group_id: string;
  created_at: Date;
  updated_at: Date;
};

export type OrderItem = {
  id: string;
  order_id: string;
  device_id: string;
  quantity: number;
  price: number;
  created_at: Date;
  updated_at: Date;
  device: Device;
};

export type Order = {
  id: string;
  code: string;
  status: string;
  total_price: number;
  created_at: Date;
  updated_at: Date;
  employee: Employee;
  client: Client;
  orderItems: OrderItem[];
};
