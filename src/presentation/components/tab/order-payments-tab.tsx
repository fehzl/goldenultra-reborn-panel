import { RemoteOrderModel } from '@/data/models';
import { makeRemoteDeleteOrderPayment } from '@/main/factories/usecases';
import { queryClient } from '@/pages/_app';
import { useMutation } from 'react-query';
import { PriceOverallCard } from '../card';
import { CreatePaymentForm } from '../form';
import { Table } from '../table';

interface Props {
  data: RemoteOrderModel;
}

export function OrderPaymentTab({ data }: Props) {
  const remoteDeleteOrderPayment = makeRemoteDeleteOrderPayment();

  const mutation = useMutation(
    async (id: string) => await remoteDeleteOrderPayment.delete({ id }),
    {
      onSuccess: () => {
        queryClient.refetchQueries([`order`, data.code]);
      },
    },
  );

  const onDelete = async (id: string) => {
    mutation.mutateAsync(id);
  };

  const renderTableColuns = () => [
    {
      label: `Inserido em`,
      width: `1/6`,
      key: `created_at`,
    },
    {
      label: `Método`,
      width: `1/6`,
      key: `method`,
    },
    {
      label: `Preço`,
      width: `1/6`,
      key: `amount`,
    },
    {
      label: `Identificação`,
      width: `1/6`,
      key: `identifier`,
    },
  ];

  return (
    <div className="space-y-8">
      <CreatePaymentForm orderId={data.id} orderCode={data.code} />
      <Table
        columns={renderTableColuns()}
        data={data.payments}
        actions={{ onDelete }}
      />
      <PriceOverallCard
        prices={[
          {
            label: `Recebido`,
            price: data.payments.reduce((acc, cur) => acc + cur.amount, 0),
          },
          {
            label: `Desconto`,
            price: 0,
          },
          {
            label: `A receber`,
            price:
              data.order_price_overall -
              data.payments.reduce((acc, cur) => acc + cur.amount, 0),
          },
        ]}
        type="sum"
      />
    </div>
  );
}
