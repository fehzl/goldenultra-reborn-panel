import { RemoteOrderModel } from '@/data/models';
import { utcToLocal } from '@/presentation/utils/formatters';
import { useState } from 'react';
import { Table } from '../table';

interface Props {
  data: RemoteOrderModel;
}

export function OrderSeparationTab({ data }: Props) {
  const [employee, setEmployee] = useState<string>(``);
  const [startedAt, setStartedAt] = useState<string>(``);
  const [finishedAt, setFinishedAt] = useState<string>(``);

  const rows = data.items.map((item) => ({
    id: item.id,
    description: item.device.exhibition_description,
    amount: item.amount,
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
        }}
        hideId
      />
    </div>
  );
}
