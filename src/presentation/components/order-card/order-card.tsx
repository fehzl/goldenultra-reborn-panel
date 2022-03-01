import { RemoteLoadOrderList } from '@/data/usecases';
import {
  enumStatusToString,
  numberToBrazilianReal,
  utcToLocal,
} from '@/presentation/utils/formatters';

interface Props {
  order: RemoteLoadOrderList.Model;
}

export default function OrderCard({ order }: Props) {
  return (
    <div className="flex flex-col space-y-4 p-8 justify-center bg-gray-100 hover:bg-gray-200 rounded-lg">
      <div className="flex flex-row space-x-4">
        <div className="flex flex-col">
          <span className="text-gray-400 text-sm">Código</span>
          <div className="text-gray-600">{order.code}</div>
        </div>
        <div className="flex flex-col">
          <span className="text-gray-400 text-sm">Cliente</span>
          <div className="text-gray-600">{order.client.name}</div>
        </div>
        <div className="flex flex-col">
          <span className="text-gray-400 text-sm">Responsável</span>
          <div className="text-gray-600">{order.employee.email}</div>
        </div>
        <div className="flex flex-col">
          <span className="text-gray-400 text-sm">Situação</span>
          <div className="text-gray-600">
            {enumStatusToString(order.status)}
          </div>
        </div>
      </div>
      <div className="flex flex-row space-x-4">
        <div className="flex flex-col">
          <span className="text-gray-400 text-sm">Criado em</span>
          <div className="text-gray-600">{utcToLocal(order.created_at)}</div>
        </div>
        <div className="flex flex-col">
          <span className="text-gray-400 text-sm">Atualizado em</span>
          <div className="text-gray-600">{utcToLocal(order.updated_at)}</div>
        </div>
      </div>
    </div>
  );
}
