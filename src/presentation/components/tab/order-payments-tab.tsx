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

  const rows = data.payments.map((payment) => ({
    id: payment.id,
    createdAt: payment.created_at,
    method: payment.method,
    value: payment.value,
    identifier: payment.identifier,
    delete: () => onDelete(payment.id),
  }));

  return (
    <div className="space-y-8">
      <CreatePaymentForm orderId={data.id} orderCode={data.code} />
      <Table
        items={rows}
        headers={{
          id: `ID`,
          createdAt: `Data`,
          value: `Valor`,
          method: `Método`,
          identifier: `Identificador`,
          delete: `Excluir`,
        }}
        customRenderers={{
          delete: (item) => (
            <button type="button" onClick={item.delete}>
              Excluir
            </button>
          ),
        }}
      />
      <PriceOverallCard
        prices={[
          {
            label: `Recebido`,
            price: data.payments.reduce((acc, cur) => acc + cur.value, 0),
          },
          {
            label: `Desconto`,
            price: 0,
          },
          {
            label: `A receber`,
            price:
              data.order_price_overall -
              data.payments.reduce((acc, cur) => acc + cur.value, 0),
          },
        ]}
        type="sum"
      />
    </div>
  );
}
