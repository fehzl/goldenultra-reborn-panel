import { RemoteOrderModel } from '@/data/models';
import { makeRemoteSaveOrderItemSeparation } from '@/main/factories/usecases';
import { queryClient } from '@/pages/_app';
import { booleanToString, utcToLocal } from '@/presentation/utils/formatters';
import { useState } from 'react';
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

  const [employee, setEmployee] = useState<string>(``);
  const [startedAt, setStartedAt] = useState<string>(``);
  const [finishedAt, setFinishedAt] = useState<string>(``);

  const rows = data.items.map((item) => ({
    id: item.id,
    description: item.device.exhibition_description,
    amount: item.amount,
    separated: booleanToString(item.separated),
    amount_separated: item.amount_separated,
    separate: () => onSeparate(item.id),
  }));

  return (
    <div>
      <span>Checklist</span>
      <div className="flex flex-row">
        <div className="block">
          <div>{utcToLocal(startedAt)}</div>
          <button
            type="button"
            onClick={() => {
              setStartedAt(new Date().toISOString());
              setEmployee(`Felipe`);
            }}
          >
            Iniciar
          </button>
        </div>
        <div className="block">
          <div>{utcToLocal(finishedAt)}</div>
          <button
            type="button"
            onClick={() => {
              setFinishedAt(new Date().toISOString());
            }}
          >
            Finalizar
          </button>
        </div>
      </div>
      <div>responsável: {employee}</div>
      <Table
        items={rows}
        headers={{
          id: `ID`,
          description: `Descrição`,
          amount: `Quantidade`,
          separated: `Separado`,
          amount_separated: `Quantidade separada`,
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
