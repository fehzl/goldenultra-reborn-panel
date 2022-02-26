import {
  numberToBrazilianReal,
  numberToBrazilianUnit,
  numberToBrazilianWeight,
} from '@/utils/formatters';
import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { BiBox, BiHash } from 'react-icons/bi';
import { useQuery } from 'react-query';
import { Device } from '..';

type AxiosDeviceResponse = {
  httpCode: number;
  message: string;
  data: Device;
};

export default function ShowItem() {
  const router = useRouter();
  const { alias: routerAlias } = router.query;

  const fetchDevice = async () =>
    await axios.get<AxiosDeviceResponse>(
      `http://localhost:3333/api/v1/devices/${routerAlias}`,
    );

  const { data, isLoading, isFetching } = useQuery(
    [`device`, routerAlias],
    () => fetchDevice(),
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
      <div className="rounded-xl">
        {isLoading && isFetching ? (
          <div>loading</div>
        ) : (
          <div className="flex flex-row bg-white p-12 rounded-lg items-center border-2 border-gray-200">
            {/* <div className="px-12 flex flex-row h-20 items-center justify-between rounded-t-xl border-b-2 border-gray-200">
              <div className="flex flex-row items-center space-x-4 h-full">
                <div>
                  <button>Habilitados</button>
                </div>
                <div>
                  <button>Desabilitados</button>
                </div>
              </div>
              <div className="flex flex-row space-x-6">
                <div className="flex flex-row space-x-2 items-center text-gray-500 cursor-pointer">
                  <span className="text-sm">Filtros</span>
                </div>
                <div className="flex flex-row space-x-2 items-center text-gray-500 cursor-pointer">
                  <span className="text-sm">Editar</span>
                </div>
                <div className="flex flex-row space-x-2 items-center text-gray-500 cursor-pointer">
                  <span className="text-sm">Remover</span>
                </div>
                <div className="flex flex-row space-x-2 items-center text-gray-500 cursor-pointer">
                  <span className="text-sm"></span>
                </div>
              </div>
            </div> */}
            <div className="flex w-44 h-44 bg-white rounded-full items-center justify-center">
              {data?.data.data.images && (
                <div>
                  <Image
                    alt="item"
                    src={data.data.data.images}
                    layout="intrinsic"
                    width={120}
                    height={120}
                    objectFit="contain"
                  />
                </div>
              )}
            </div>
            <div className="flex flex-row items-top justify-around w-full">
              <div className="flex flex-col space-y-4">
                <div className="mb-3 text-gray-500">Detalhes</div>
                <div className="flex flex-col space-y-1">
                  <span className="text-sm font-normal text-gray-500">
                    Descrição de Exibição
                  </span>
                  <span className="text-md text-gray-600">
                    {data?.data.data.exhibition_description}
                  </span>
                </div>
                <div className="flex flex-col space-y-1">
                  <span className="text-sm font-normal text-gray-500">
                    Descrição Detalhada
                  </span>
                  <span className="text-md text-gray-600">
                    {data?.data.data.detailed_description}
                  </span>
                </div>
              </div>
              <div className="flex flex-col space-y-4">
                <div className="mb-2 text-gray-500">Logistica</div>
                <div className="flex flex-col space-y-1">
                  <span className="text-sm font-normal text-gray-500">
                    Unidades em uma Caixa
                  </span>
                  <span className="text-md text-gray-600">
                    {numberToBrazilianUnit(data?.data.data.un_in_a_box)}
                  </span>
                </div>
                <div className="flex flex-col space-y-1">
                  <span className="text-sm font-normal text-gray-500">
                    Peso
                  </span>
                  <span className="text-md text-gray-600">
                    {numberToBrazilianWeight(data?.data.data.net_weight)}
                  </span>
                </div>
                <div className="flex flex-col space-y-1">
                  <span className="text-sm font-normal text-gray-500">
                    Peso Líquido
                  </span>
                  <span className="text-md text-gray-600">
                    {numberToBrazilianWeight(data?.data.data.gross_weight)}
                  </span>
                </div>
              </div>
              <div className="flex flex-col space-y-4">
                <div className="mb-3 text-gray-500">Financeiro</div>
                <div className="flex flex-col space-y-1">
                  <span className="text-sm font-normal text-gray-500">
                    Preço da Unidade
                  </span>
                  <span className="text-md text-gray-600">
                    {numberToBrazilianReal(data?.data.data.un_price)}
                  </span>
                </div>
                <div className="flex flex-col space-y-1">
                  <span className="text-sm font-normal text-gray-500">
                    Preço da Caixa
                  </span>
                  <span className="text-md text-gray-600">
                    {numberToBrazilianReal(data?.data.data.box_price)}
                  </span>
                </div>
              </div>
              <div className="flex flex-col space-y-4">
                <div className="mb-3 text-gray-500">Loja</div>
                <div className="flex flex-col space-y-1">
                  <span className="text-sm font-normal text-gray-500">
                    Disponíveis na loja
                  </span>
                  <span className="text-md text-gray-600">
                    {numberToBrazilianUnit(
                      data?.data.data.un_avaliable_to_sell,
                    )}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
