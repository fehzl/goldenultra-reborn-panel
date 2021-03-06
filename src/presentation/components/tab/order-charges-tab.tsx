import { RemoteOrderModel } from '@/data/models';
import { makeRemoteDeleteOrderCharge } from '@/main/factories/usecases';
import { queryClient } from '@/pages/_app';
import { orderChargeTypeToString } from '@/presentation/utils/enumsToString';
import {
  numberToBrazilianReal,
  utcToLocal,
} from '@/presentation/utils/formatters';
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

  const onDelete = async (id: string) => {
    mutation.mutateAsync(id);
  };

  const rows = data.charges.map((charge) => ({
    id: charge.id,
    createdAt: utcToLocal(charge.created_at),
    type: orderChargeTypeToString(charge.type),
    value: numberToBrazilianReal(charge.value),
    //
    delete: () => onDelete(charge.id),
  }));

  return (
    <div className="flex flex-col space-y-8">
      <CreateChargeForm order_id={data.id} order_code={data.code} />
      <Table
        items={rows}
        headers={{
          id: `ID`,
          createdAt: `Inserido em`,
          type: `Tipo`,
          value: `Valor`,
          delete: `Ações`,
        }}
        customRenderers={{
          delete: (item) => (
            <button type="button" onClick={item.delete}>
              Excluir
            </button>
          ),
        }}
        hideId
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
