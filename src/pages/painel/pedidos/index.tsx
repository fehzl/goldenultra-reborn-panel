import OrderCard from '@/components/order-card/order-card';
import axios from 'axios';
import Link from 'next/link';
import { useState } from 'react';
import { BiShoppingBag } from 'react-icons/bi';
import { useQuery } from 'react-query';

export default function Orders() {
  const [showing, setShowing] = useState<'new' | 'paid' | 'separation' | 'end'>(
    `new`,
  );

  const fetchOrder = async () =>
    await axios.get<any>(`http://localhost:3333/api/v1/orders`);

  const { isLoading, data, isFetching } = useQuery([`orders`], () =>
    fetchOrder(),
  );

  return (
    <div className="px-12">
      <div className="flex pt-4 pb-8 flex-row justify-between items-center">
        <div className="flex space-x-2 items-center flex-row text-gray-500">
          <BiShoppingBag className="text-2xl" />
          <span className="text-md">Pedidos</span>
        </div>
        <button className="flex flex-row text-sm items-center justify-around px-2 py-1 bg-green-400 hover:bg-green-300 transition-all ease-in duration-100 rounded-full text-white w-36 h-10">
          <Link href="/painel/pedidos/novo-pedido" passHref>
            <span className="font-bold">Novo Pedido</span>
          </Link>
        </button>
      </div>
      <div className="rounded-xl border-2 border-gray-200 bg-white">
        <div className="px-12 flex flex-row h-20 items-center justify-between rounded-t-xl border-b-2 border-gray-200">
          <div className="flex flex-row items-center space-x-4 h-full">
            <div
              className={` cursor-pointer text-sm ${
                showing === `new`
                  ? `font-bold text-green-500`
                  : `font-normal text-gray-500`
              }`}
            >
              <button>Meus</button>
            </div>
            <div
              className={` cursor-pointer text-sm ${
                showing === `separation`
                  ? `font-bold text-green-500`
                  : `font-normal text-gray-500`
              }`}
            >
              <button>Novos</button>
            </div>
            <div
              className={` cursor-pointer text-sm ${
                showing === `paid`
                  ? `font-bold text-green-500`
                  : `font-normal text-gray-500`
              }`}
            >
              <button>Pagos</button>
            </div>
            <div
              className={` cursor-pointer text-sm ${
                showing === `separation`
                  ? `font-bold text-green-500`
                  : `font-normal text-gray-500`
              }`}
            >
              <button>Separação</button>
            </div>
            <div
              className={` cursor-pointer text-sm ${
                showing === `separation`
                  ? `font-bold text-green-500`
                  : `font-normal text-gray-500`
              }`}
            >
              <button>Expedição</button>
            </div>
            <div
              className={` cursor-pointer text-sm ${
                showing === `end`
                  ? `font-bold text-green-500`
                  : `font-normal text-gray-500`
              }`}
            >
              <button>Finalizados</button>
            </div>
            <div
              className={` cursor-pointer text-sm ${
                showing === `end`
                  ? `font-bold text-green-500`
                  : `font-normal text-gray-500`
              }`}
            >
              <button>Cancelados</button>
            </div>
          </div>
        </div>
        <div className="transition-transform duration-150 ease-in px-12 py-12">
          {isLoading ? (
            <div>loading</div>
          ) : (
            data?.data.data.map((order: any) => (
              <Link key={order.id} href={`pedidos/p/${order.code}`}>
                <a>
                  <OrderCard order={order} />
                </a>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
