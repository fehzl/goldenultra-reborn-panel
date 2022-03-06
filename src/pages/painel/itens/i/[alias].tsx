import { RemoteLoadDevice } from '@/data/usecases';
import { AxiosHttpClientAdapter } from '@/infra/http/axios-http-client-adapter';
import { PageHeader } from '@/presentation/components/shared/page/header';
import {
  numberToBrazilianReal,
  numberToBrazilianUnit,
  numberToBrazilianWeight,
} from '@/presentation/utils/formatters';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { BiBox, BiHash } from 'react-icons/bi';
import { useQuery } from 'react-query';

export default function ShowItem() {
  const router = useRouter();
  const { alias: routerAlias } = router.query;

  const httpClient = new AxiosHttpClientAdapter();
  const url = `http://132.226.243.30:3333/api/v1/devices/${routerAlias}`;
  const remoteLoadDevice = new RemoteLoadDevice(url, httpClient);

  const { data, isLoading, isFetching } = useQuery(
    [`device`, routerAlias],
    async () => await remoteLoadDevice.load(routerAlias as string),
  );

  return (
    <div>
      <PageHeader
        type="title-subtitle"
        titleIcon={<BiBox />}
        titleText="Pedidos"
        subtitleIcon={<BiHash />}
        subtitleText={data?.id}
      />
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
              {data?.images && (
                <div>
                  <Image
                    alt="item"
                    src={data?.images}
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
                    {data?.exhibition_description}
                  </span>
                </div>
                <div className="flex flex-col space-y-1">
                  <span className="text-sm font-normal text-gray-500">
                    Descrição Detalhada
                  </span>
                  <span className="text-md text-gray-600">
                    {data?.detailed_description}
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
                    {numberToBrazilianUnit(data?.un_in_a_box)}
                  </span>
                </div>
                <div className="flex flex-col space-y-1">
                  <span className="text-sm font-normal text-gray-500">
                    Peso
                  </span>
                  <span className="text-md text-gray-600">
                    {numberToBrazilianWeight(data?.net_weight)}
                  </span>
                </div>
                <div className="flex flex-col space-y-1">
                  <span className="text-sm font-normal text-gray-500">
                    Peso Líquido
                  </span>
                  <span className="text-md text-gray-600">
                    {numberToBrazilianWeight(data?.gross_weight)}
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
                    {numberToBrazilianReal(data?.un_price)}
                  </span>
                </div>
                <div className="flex flex-col space-y-1">
                  <span className="text-sm font-normal text-gray-500">
                    Preço da Caixa
                  </span>
                  <span className="text-md text-gray-600">
                    {numberToBrazilianReal(data?.box_price)}
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
                    {numberToBrazilianUnit(data?.un_avaliable_to_sell)}
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
