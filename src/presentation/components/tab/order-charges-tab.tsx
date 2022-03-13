import { RemoteOrderModel } from '@/data/models';
import { makeRemoteDeleteOrderCharge } from '@/main/factories/usecases';
import { queryClient } from '@/pages/_app';
import { useMutation } from 'react-query';
import { PriceOverallCard } from '../card';
import { CreateChargeForm } from '../form/create-charge-form';
import { Table } from '../table';

interface Props {
  data: RemoteOrderModel;
}

export function OrderChargersTab({ data }: Props) {
  const remoteDeleteOrderCharge = makeRemoteDeleteOrderCharge();

  const mutation = useMutation(
    async (id: string) => await remoteDeleteOrderCharge.delete({ id }),
    {
      onSuccess: () => {
        queryClient.refetchQueries([`order`, data.code]);
      },
    },
  );

  const renderTableColuns = () => [
    {
      label: `Inserido em`,
      width: `1/6`,
      key: `created_at`,
    },
    {
      label: `Tipo`,
      width: `1/6`,
      key: `type`,
    },
    {
      label: `Preço`,
      width: `1/6`,
      key: `value`,
    },
    {
      label: `Observações`,
      width: `2/6`,
      key: `observation`,
    },
  ];

  const onDelete = async (id: string) => {
    mutation.mutateAsync(id);
  };

  return (
    <div className="flex flex-col space-y-8">
      <CreateChargeForm order_id={data.id} order_code={data.code} />
      <Table
        columns={renderTableColuns()}
        data={data.charges}
        actions={{ onDelete }}
      />
      <PriceOverallCard
        prices={[
          {
            label: `Itens`,
            price: data.items_price_sum,
          },
          {
            label: `Encargos`,
            price: data.charges_sum,
          },
          {
            label: `Total`,
            price: data.order_price_overall,
          },
        ]}
        type="minus"
      />
    </div>
  );
}
