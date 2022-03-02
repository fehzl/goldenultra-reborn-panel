import ItemsCard from '@/presentation/components/items-card/items-card';
import Link from 'next/link';
import { useState } from 'react';
import {
  BiBox,
  BiEditAlt,
  BiFilter,
  BiSearch,
  BiTrashAlt,
} from 'react-icons/bi';
import { useQuery } from 'react-query';
import { PageHeader } from '@/presentation/components/page-header';
import { makeRemoteLoadDeviceList } from '@/main/factories/usecases';

export default function Items() {
  const remoteLoadDeviceList = makeRemoteLoadDeviceList();

  const [showAvailable, setShowAvailable] = useState<boolean>(true);
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const [search, setSearch] = useState<string>(``);

  const { isLoading, data, isFetching } = useQuery(
    [`devices`, showAvailable, search],
    () => remoteLoadDeviceList.loadAll({ showAvailable, search, limit: 15 }),
    { keepPreviousData: true },
  );

  return (
    <div>
      <PageHeader
        type="title-link"
        titleIcon={<BiBox />}
        titleText="Itens"
        linkHref="/painel/itens/novo-item"
        linkText="Novo"
      />
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
              {data?.map((device) => (
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
