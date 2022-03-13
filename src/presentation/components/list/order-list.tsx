import { RemoteOrderModel } from '@/data/models';
import {
  enumStatusToString,
  numberToBrazilianReal,
  utcToLocal,
} from '@/presentation/utils/formatters';
import { useRouter } from 'next/router';

interface Props {
  orders: RemoteOrderModel[];
}

export function OrderList({ orders = [] }: Props) {
  const router = useRouter();

  return (
    <div className="px-8">
      <table className="min-w-full text-center">
        <thead>
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-sm font-medium text-gray-500"
            >
              <input type="checkbox" />
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-sm font-medium text-gray-500"
            >
              Código
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-sm font-medium text-gray-500"
            >
              Situação
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-sm font-medium text-gray-500"
            >
              Responsável
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-sm font-medium text-gray-500"
            >
              Cliente
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-sm font-medium text-gray-500"
            >
              Itens
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-sm font-medium text-gray-500"
            >
              Valor
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-sm font-medium text-gray-500"
            >
              Criado em
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-sm font-medium text-gray-500"
            >
              Atualizado em
            </th>
          </tr>
        </thead>
        <tbody className="bg-white text-sm">
          {orders?.map((order, index) => (
            <tr
              key={order.id}
              className={`rounded-xl
                    ${index % 2 === 0 ? `bg-gray-100` : `bg-white`}
                  `}
            >
              <td className="px-6 py-3 truncate">
                <input type="checkbox" />
              </td>
              <td
                className="px-6 py-3 truncate cursor-pointer hover:text-blue-400"
                onClick={() => {
                  router.push(`/painel/pedidos/p/${order.code}`);
                }}
              >
                {order.code}
              </td>
              <td className="px-6 py-3 truncate">
                {enumStatusToString(order.situation)}
              </td>
              <td className="px-6 py-3 truncate">{order.employee.name}</td>
              <td className="px-6 py-3">{order.client.name}</td>
              <td className="px-6 py-3">{order.items.length}</td>
              <td className="px-6 py-3">
                {numberToBrazilianReal(order.order_price_overall)}
              </td>
              <td className="px-6 py-3">{utcToLocal(order.created_at)}</td>
              <td className="px-6 py-3">{utcToLocal(order.updated_at)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
