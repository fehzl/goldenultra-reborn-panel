import ItemsCard from '@/components/items-card/items-card';
import axios from 'axios';
import Link from 'next/link';
import { useState } from 'react';
import {
  BiBox,
  BiEditAlt,
  BiFilter,
  BiPlus,
  BiSearch,
  BiTrashAlt,
} from 'react-icons/bi';
import { useQuery } from 'react-query';

export type Device = {
  id: string;
  alias: string;
  code: string;
  un_in_a_box: number;
  net_weight: number;
  gross_weight: number;
  exhibition_description: string;
  detailed_description: string;
  images: string;
  available_to_sell: boolean;
  un_price: number;
  box_price: number;
  un_avaliable_to_sell: number;
  group_id: string;
  created_at: Date;
  updated_at: Date;
};

type AxiosDevicesResponse = {
  httpCode: number;
  message: string;
  data: Device[];
};

export default function Items() {
  const [showAvailable, setShowAvailable] = useState<boolean>(true);
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const [search, setSearch] = useState<string>(``);

  const fetchDevices = async (showAvaliable = true, search = ``) =>
    await axios.get<AxiosDevicesResponse>(
      `http://localhost:3333/api/v1/devices?search=${search}&availableToSell=${showAvaliable}&limit=18`,
    );

  const { isLoading, data, isFetching } = useQuery(
    [`devices`, showAvailable, search],
    () => fetchDevices(showAvailable, search),
    { keepPreviousData: true },
  );

  return (
    <div className="px-12">
      <div className="flex pt-4 pb-8 flex-row justify-between items-center">
        <div className="flex space-x-2 items-center flex-row text-gray-500">
          <BiBox className="text-2xl" />
          <span className="text-md">Itens</span>
        </div>
        <button className="flex flex-row text-sm items-center justify-around px-2 py-1 bg-green-400 hover:bg-green-300 transition-all ease-in duration-100 rounded-full text-white w-36 h-10">
          <Link href="/painel/itens/novo-item" passHref>
            <span className="font-bold">Novo Item</span>
          </Link>
        </button>
      </div>
      <div className="rounded-xl border-2 border-gray-200 bg-white">
        <div className="px-12 flex flex-row h-20 items-center justify-between rounded-t-xl border-b-2 border-gray-200">
          <div className="flex flex-row items-center space-x-4 h-full">
            <div
              className={` cursor-pointer text-sm ${
                showAvailable
                  ? `font-bold text-green-500`
                  : `font-normal text-gray-500`
              }`}
            >
              <button onClick={() => setShowAvailable(true)}>
                Habilitados
              </button>
            </div>
            <div
              className={`cursor-pointer text-sm ${
                !showAvailable
                  ? `font-bold text-red-500`
                  : `font-normal text-gray-500`
              }`}
            >
              <button onClick={() => setShowAvailable(false)}>
                Desabilitados
              </button>
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
              <BiTrashAlt className="text-xl" />
              <span className="text-sm">Remover</span>
            </div>
            <div className="flex flex-row space-x-2 items-center text-gray-500 cursor-pointer">
              <BiSearch
                onClick={() => setShowSearch(!showSearch)}
                className="text-xl"
              />
              <span className="text-sm">
                {showSearch ? (
                  <input
                    className="bg-gray-100 rounded-lg px-3 py-2 w-full focus:outline-none"
                    id="search-bar"
                    name="search-bar"
                    onChange={(e) => setSearch(e.target.value)}
                    value={search}
                  />
                ) : (
                  `Pesquisar`
                )}
              </span>
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
          <div className="transition-transform duration-150 ease-in px-12 py-12">
            <div className="grid grid-cols-6 sm:grid-cols-3 lg:grid-cols-5 gap-12">
              {data?.data.data.map((device) => (
                <Link key={device.id} href={`itens/i/${device.alias}`} passHref>
                  <a>
                    <ItemsCard key={device.id} device={device} />
                  </a>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
