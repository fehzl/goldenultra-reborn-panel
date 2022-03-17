export type RemotePaymentModel = {
  id: string;
  order_id: string;
  method: string;
  situation: string;
  value: number;
  identifier: string;
  created_at: Date;
  updated_at: Date;
};
