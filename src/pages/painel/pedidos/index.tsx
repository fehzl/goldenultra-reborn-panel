import { RemoteLoadOrderList } from '@/data/usecases';
import { AxiosHttpClientAdapter } from '@/infra/http/axios-http-client-adapter';
import Link from 'next/link';
import { useState } from 'react';
import { BiFilter, BiPrinter, BiShoppingBag } from 'react-icons/bi';
import { useQuery } from 'react-query';
import {
  enumStatusToString,
  numberToBrazilianReal,
  utcToLocal,
} from '@/presentation/utils/formatters';

export default function Orders() {
  const httpClient = new AxiosHttpClientAdapter();
  const url = `http://localhost:3333/api/v1/orders`;
  const remoteLoadOrderList = new RemoteLoadOrderList(url, httpClient);

  const { isLoading, data, isFetching } = useQuery(
    [`orders`],
    async () => await remoteLoadOrderList.loadAll(),
  );

  const [showing, setShowing] = useState<'all' | 'pending' | 'ended'>(`all`);
  const [selecteds, setSelecteds] = useState<string[]>([]);

  const getSituationColor = (situation: string) => {
    switch (situation) {
      case `new`:
        return `text-green-400`;
      case `finished`:
        return `text-red-400`;
      default:
        return `text-orange-400`;
    }
  };

  return (
    <div className="px-12">
      <div className="flex pt-4 pb-8 flex-row justify-between items-center">
        <div className="flex space-x-2 items-center flex-row text-gray-500">
          <BiShoppingBag className="text-2xl" />
          <span className="text-md">Pedidos</span>
        </div>
        <Link href="/painel/pedidos/novo-pedido" passHref>
          <a>
            <button className="flex flex-row text-sm items-center justify-around px-2 py-1 bg-green-400 hover:bg-green-300 transition-all ease-in duration-100 rounded-full text-white h-10">
              <span className="w-32">Novo</span>
            </button>
          </a>
        </Link>
      </div>
      <div className="rounded-xl border-2 border-gray-200 bg-white">
        <div className="px-12 flex flex-row h-20 items-center justify-between rounded-t-xl border-b-2 border-gray-200">
          <div className="flex flex-row items-center space-x-4 h-full">
            <div
              className={` cursor-pointer text-sm ${
                showing === `all`
                  ? `font-bold text-green-500`
                  : `font-normal text-gray-500`
              }`}
              onClick={() => setShowing(`all`)}
            >
              <button>Todos</button>
            </div>
            <div
              className={` cursor-pointer text-sm ${
                showing === `pending`
                  ? `font-bold text-orange-500`
                  : `font-normal text-gray-500`
              }`}
              onClick={() => setShowing(`pending`)}
            >
              <button>Em curso</button>
            </div>
            <div
              className={` cursor-pointer text-sm ${
                showing === `ended`
                  ? `font-bold text-red-500`
                  : `font-normal text-gray-500`
              }`}
              onClick={() => setShowing(`ended`)}
            >
              <button>Finalizados</button>
            </div>
          </div>
          <div className="flex flex-row space-x-6">
            <div className="flex flex-row space-x-2 items-center text-gray-500 cursor-pointer">
              <BiFilter className="text-xl" />
              <span className="text-sm">Filtros</span>
            </div>
            <div
              className="flex flex-row space-x-2 items-center text-gray-500 cursor-pointer"
              onClick={() => {
                console.log(selecteds);
              }}
            >
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
          <div className="p-12 ">
            <div className="flex pb-4 space-x-6 px-6 whitespace-nowrap items-center justify-evenly text-sm text-gray-600">
              <div className="flex">
                <div className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <span className="">Código</span>
              </div>
              <div className="flex-1">
                <span className="">Situação</span>
              </div>
              <div className="flex-1">
                <span className="">Responsável</span>
              </div>
              <div className="flex-1">
                <span className="">Cliente</span>
              </div>
              <div className="flex-1">
                <span className="">Itens</span>
              </div>
              <div className="flex-1">
                <span className="">Valor</span>
              </div>
              <div className="flex-1">
                <span className="">Criado em</span>
              </div>
              <div className="flex-1">
                <span className="">Atualizado em</span>
              </div>
            </div>
            {data?.map((order, index) => (
              <div
                id={`order-${index}`}
                className={`rounded-xl py-3 ${
                  index % 2 === 0 ? `bg-gray-100` : ``
                }`}
                key={order.id}
              >
                <div className="flex space-x-6 px-6 whitespace-nowrap items-center justify-evenly text-sm text-gray-700">
                  <div className="flex">
                    <input
                      type="checkbox"
                      className="w-4 h-4"
                      checked={selecteds.includes(order.id)}
                      onChange={() => {
                        if (selecteds.includes(order.id)) {
                          setSelecteds(
                            selecteds.filter((id) => id !== order.id),
                          );
                        } else {
                          setSelecteds([...selecteds, order.id]);
                        }
                      }}
                    />
                  </div>
                  <div className="flex-1">
                    <Link href={`/painel/pedidos/p/${order.code}`} passHref>
                      <a>
                        <span className="hover:text-blue-400 hover:font-semibold">
                          {order.code}
                        </span>
                      </a>
                    </Link>
                  </div>
                  <div className="flex-1">
                    <span className={`${getSituationColor(order.status)}`}>
                      {enumStatusToString(order.status)}
                    </span>
                  </div>
                  <div className="flex-1">
                    <span className="">{order.employee.name}</span>
                  </div>
                  <div className="flex-1">
                    <span className="">{order.client.name}</span>
                  </div>
                  <div className="flex-1">
                    <span className="">{order.items.length}</span>
                  </div>
                  <div className="flex-1">
                    <span className="">
                      {numberToBrazilianReal(order.total)}
                    </span>
                  </div>
                  <div className="flex-1">
                    <span className="">{utcToLocal(order.created_at)}</span>
                  </div>
                  <div className="flex-1">
                    <span className="">{utcToLocal(order.created_at)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
