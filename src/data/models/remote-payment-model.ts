export type RemotePaymentModel = {
  id: string;
  order_id: string;
  method: string;
  situation: string;
  amount: number;
  identifier: string;
  observation: string;
  created_at: Date;
  updated_at: Date;
};
