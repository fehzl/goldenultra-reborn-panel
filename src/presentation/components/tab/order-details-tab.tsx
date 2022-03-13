import { RemoteOrderModel } from '@/data/models';
import { ClientCard, OrderDetailsCard } from '../card';
import { OrderItemList } from '../list';

interface Props {
  data: RemoteOrderModel;
}

export function OrderDetailsTab({ data }: Props) {
  return (
    <>
      <OrderDetailsCard order={data} />
      <ClientCard client={data.client} />
      <OrderItemList items={data.items} />
    </>
  );
}
