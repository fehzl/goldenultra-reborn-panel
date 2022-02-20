import axios from 'axios';
import Link from 'next/link';
import { useQuery } from 'react-query';
import { IoAdd } from 'react-icons/io5';

export default function Items() {
  const { isLoading, error, data } = useQuery(`groups`, () =>
    axios.get(`http://localhost:3333/api/v1/groups`),
  );

  return (
    <div>
      <div>
        <h1 className="text-2xl text-gray-700 font-bold tracking-tighter mb-4">
          Meus Grupos
        </h1>
        <div className="grid grid-flow-col gap-x-2 overflow-x-auto scrollbar-hide overflow-y-hidden">
          <Link href="/painel/itens/novo-grupo" passHref>
            <div className="w-28 h-28 bg-green-500 overflow-hidden flex justify-end items-end text-right p-2">
              <span className="font-bold text-3xl text-white">+</span>
            </div>
          </Link>
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            data?.data.data.map((group: any) => (
              <div
                key={group.id}
                className="w-28 h-28 bg-gray-500 flex justify-end items-end text-right p-2"
              >
                <span className="text-white font-bold text-sm">
                  {group.name}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
      <div>
        <h1 className="text-2xl text-gray-700 font-bold tracking-tighter mt-8 mb-4">
          Meus Itens
        </h1>
        <div className="grid grid-flow-col gap-x-2 overflow-x-auto scrollbar-hide overflow-y-hidden">
          <Link href="/painel/itens/novo-grupo" passHref>
            <div className="w-28 h-28 bg-green-500 overflow-hidden flex justify-end items-end text-right p-2">
              <span className="font-bold text-3xl text-white">+</span>
            </div>
          </Link>
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            data?.data.data.map((group: any) => (
              <div
                key={group.id}
                className="w-28 h-28 bg-gray-500 flex justify-end items-end text-right p-2"
              >
                <span className="text-white font-bold text-sm">
                  {group.name}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
