import { RemoteOrderModel } from '@/data/models/remote-order-model';
import {
  enumStatusToString,
  utcToLocal,
} from '@/presentation/utils/formatters';

interface OrderDetailsProps {
  order: RemoteOrderModel;
}

export function OrderDetails({ order }: OrderDetailsProps) {
  return (
    <div className="px-12 py-4 border-2 rounded-xl bg-gray-50 border-gray-200 border-dotted">
      <div className="flex flex-col space-y-2">
        <div className="flex flex-row space-x-2">
          <span>Situação:</span>
          <span>{enumStatusToString(order.status)}</span>
        </div>
        <div className="flex flex-row space-x-2">
          <span>Responsável:</span>
          <span>{order.employee.name}</span>
        </div>
        <div className="flex flex-row space-x-2">
          <span>Criado em:</span>
          <span>{utcToLocal(order.created_at)}</span>
        </div>
        <div className="flex flex-row space-x-2">
          <span>Atualizado em:</span>
          <span>{utcToLocal(order.updated_at)}</span>
        </div>
      </div>
    </div>
  );
}
