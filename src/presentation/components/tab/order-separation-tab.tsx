import { RemoteOrderModel } from '@/data/models';
import { makeRemoteSaveOrderItemSeparation } from '@/main/factories/usecases';
import { queryClient } from '@/pages/_app';
import { booleanToString, utcToLocal } from '@/presentation/utils/formatters';
import { useMutation } from 'react-query';
import { Table } from '../table';

interface Props {
  data: RemoteOrderModel;
}

export function OrderSeparationTab({ data }: Props) {
  const remoteOrderItemSeparation = makeRemoteSaveOrderItemSeparation();

  const mutation = useMutation(
    async (id: string) => await remoteOrderItemSeparation.save({ id }),
    {
      onSuccess: () => {
        queryClient.refetchQueries([`order`, data.code]);
      },
    },
  );

  const onSeparate = async (id: string) => {
    mutation.mutateAsync(id);
  };

  const rows = data.items.map((item) => ({
    id: item.id,
    description: item.device.exhibition_description,
    separated: booleanToString(item.separated),
    amount: `${item.amount}/${item.amount_separated}`,
    separated_by: item.separated ? item.separated_by.name : `---`,
    separated_at: item.separated ? utcToLocal(item.separated_at) : `---`,
    separate: () => onSeparate(item.id),
  }));

  return (
    <div>
      <Table
        items={rows}
        headers={{
          id: `ID`,
          description: `Descrição`,
          separated: `Separado`,
          amount: `Quantidade`,
          separated_by: `Separado por`,
          separated_at: `Separado em`,
          separate: `Separar`,
        }}
        customRenderers={{
          separate: (item) => (
            <button type="button" onClick={item.separate}>
              Separar
            </button>
          ),
        }}
        hideId
      />
    </div>
  );
}
