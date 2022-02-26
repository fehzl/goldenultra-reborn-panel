import { OrderClient, OrderDetails, OrderItems } from '@/components/order';
import { Order } from '@/types';
import axios from 'axios';
import { useRouter } from 'next/router';
import { BiBox, BiEditAlt, BiFilter, BiHash, BiPrinter } from 'react-icons/bi';
import { useQuery } from 'react-query';

type AxiosOrderResponse = {
  httpCode: number;
  message: string;
  data: Order;
};

export default function ShowOrder() {
  const router = useRouter();
  const { code: routerCode } = router.query;

  const fetchOrder = async () =>
    await axios.get<AxiosOrderResponse>(
      `http://localhost:3333/api/v1/orders/${routerCode}`,
    );

  const { data, isLoading, isFetching } = useQuery([`order`, routerCode], () =>
    fetchOrder(),
  );

  return (
    <div className="px-12">
      <div className="flex pt-4 pb-8 flex-row justify-between items-center">
        <div className="flex space-x-2 items-center flex-row text-gray-500">
          <BiBox className="text-2xl" />
          <span className="text-md">
            {data?.data.data !== null && data?.data.data.code}
          </span>
        </div>
        <div className="flex space-x-2 items-center flex-row text-gray-300">
          <BiHash className="text-2xl" />
          <span className="text-md">{data?.data.data.id}</span>
        </div>
      </div>
      <div className="rounded-xl border-2 border-gray-200 bg-white">
        <div className="px-12 flex flex-row h-20 items-center justify-between rounded-t-xl border-b-2 border-gray-200">
          <div className="flex flex-row items-center space-x-4 h-full">
            <div className="cursor-pointer text-sm font-normal text-green-500">
              <button>Detalhes</button>
            </div>
            <div className="cursor-pointer text-sm font-normal text-gray-500">
              <button>Pagamento</button>
            </div>
            <div className="cursor-pointer text-sm font-normal text-gray-500">
              <button>Separação</button>
            </div>
            <div className="cursor-pointer text-sm font-normal text-gray-500">
              <button>Histórico</button>
            </div>
          </div>
          <div className="flex flex-row space-x-6">
            <div className="flex flex-row space-x-2 items-center text-gray-500 cursor-pointer">
              <BiFilter className="text-xl" />
              <span className="text-sm">Filtros</span>
            </div>
            <div className="flex flex-row space-x-2 items-center text-gray-500 cursor-pointer">
              <BiEditAlt className="text-xl" />
              <span className="text-sm">Editar</span>
            </div>
            <div className="flex flex-row space-x-2 items-center text-gray-500 cursor-pointer">
              <BiPrinter className="text-xl" />
              <span className="text-sm">Exportar</span>
            </div>
          </div>
        </div>
        {isLoading && isFetching ? (
          <div className="px-12 py-12 text-center">
            <div className="spinner-border text-gray-500" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        ) : (
          <div className="transition-transform duration-150 ease-in px-12 py-12 space-y-12">
            {data?.data.data && (
              <>
                <OrderDetails order={data?.data.data} />
                <OrderClient client={data?.data.data.client} />
                <OrderItems items={data?.data.data.orderItems} hideActions />
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
