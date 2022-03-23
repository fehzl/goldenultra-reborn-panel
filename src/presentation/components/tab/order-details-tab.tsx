import { RemoteOrderModel } from '@/data/models';
import { numberToBrazilianReal } from '@/presentation/utils/formatters';
import { ClientCard, OrderDetailsCard } from '../card';
import { Table } from '../table';

interface Props {
  data: RemoteOrderModel;
}

export function OrderDetailsTab({ data }: Props) {
  const rows = data.items.map((item) => ({
    id: item.id,
    code: item.device.code,
    description: item.device.exhibition_description,
    price: numberToBrazilianReal(item.price),
    amount: item.amount,
    overall: numberToBrazilianReal(item.overall),
  }));

  return (
    <>
      <OrderDetailsCard order={data} />
      <ClientCard client={data.client} />
      <Table
        items={rows}
        headers={{
          id: `ID`,
          code: `Código`,
          description: `Descrição`,
          price: `Preço`,
          amount: `Quantidade`,
          overall: `Total`,
        }}
        hideId
      />
    </>
  );
}
