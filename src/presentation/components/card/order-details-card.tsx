import { RemoteOrderModel } from '@/data/models/remote-order-model';
import {
  enumStatusToString,
  utcToLocal,
} from '@/presentation/utils/formatters';

interface OrderDetailsProps {
  order: RemoteOrderModel;
}

export function OrderDetailsCard({ order }: OrderDetailsProps) {
  return (
    <div>
      <div className="pb-4 text-gray-600">
        <span>Detalhes do Pedido</span>
      </div>
      <div className="flex flex-row space-x-24 text-sm">
        <div className="flex flex-col space-y-2 w-1/3">
          <div className="flex flex-row space-x-1">
            <span className="text-gray-600">Situação:</span>
            <span className="text-gray-500">
              {enumStatusToString(order.situation)}
            </span>
          </div>
          <div className="flex flex-row space-x-1">
            <span className="text-gray-600">Responsável:</span>
            <span className="text-gray-500">{order.employee.name}</span>
          </div>
          <div className="flex flex-row space-x-1">
            <span className="text-gray-600">Criado em:</span>
            <span className="text-gray-500">
              {utcToLocal(order.created_at)}
            </span>
          </div>
          <div className="flex flex-row space-x-1">
            <span className="text-gray-600">Atualizado em:</span>
            <span className="text-gray-500">
              {utcToLocal(order.updated_at)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
