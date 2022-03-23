import { DeviceModel } from '.';
import { EmployeeModel } from './employee-model';

export type OrderItemModel = {
  id: string;
  price: number;
  amount: number;
  discount: number;
  overall: number;
  separated: boolean;
  separated_by: EmployeeModel;
  separated_at: Date;
  amount_separated: number;
  device: DeviceModel;
};
