import { RemoteLoadOrder } from '@/data/usecases';
import { AxiosHttpClientAdapter } from '@/infra/http/axios-http-client-adapter';
import {
  numberToBrazilianReal,
  utcToLocal,
} from '@/presentation/utils/formatters';
import { useRouter } from 'next/router';
import QRCode from 'react-qr-code';
import { useQuery } from 'react-query';

export default function PrintOrder() {
  const router = useRouter();
  const { code: routerCode } = router.query;

  const httpClient = new AxiosHttpClientAdapter();
  const url = `http://localhost:3333/api/v1/orders/${routerCode}`;
  const remoteLoadOrder = new RemoteLoadOrder(url, httpClient);

  const { data } = useQuery(
    [`order`, routerCode],
    async () => await remoteLoadOrder.load(routerCode as string),
  );

  return (
    <div className="flex flex-col space-y-5 w-[794px] h-[1123px] bg-white p-6">
      <div className="flex text-sm flex-row justify-around items-center">
        <div className="w-1/3 flex justify-left">
          <h1 className="flex items-center text-3xl text-gray-800 font-bold tracking-tighter">
            <span>Goldenultra</span>
            <span className="text-green-500 text-4xl">.</span>
          </h1>
        </div>
        <div className="w-1/3 flex flex-col justify-center items-center">
          <span className="font-bold text-gray-600">{data?.code}</span>
          <span className="text-gray-500">
            {utcToLocal(data?.created_at || ``)}
          </span>
        </div>
        <div className="w-1/3 flex justify-end">
          <QRCode
            size={100}
            value={`http://localhost:3000/painel/pedidos/p/${data?.code}`}
          />
        </div>
      </div>
      <div className="px-3 text-sm py-4 border-2 rounded-xl bg-gray-50 border-gray-200 border-dotted">
        <div className="flex flex-col space-y-2">
          <div className="flex flex-col">
            <span>Cliente</span>
            <span>{data?.client.name}</span>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="my-2">
          <div className="py-2 align-middle inline-block min-w-full">
            <div className="overflow-hidden">
              <div className="border-2 py-3 rounded-xl bg-gray-50 border-gray-200 border-dotted">
                <table className="min-w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-1 text-left text-sm font-medium text-gray-500"
                      >
                        Código
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-1 text-left text-sm font-medium text-gray-500"
                      >
                        Item
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-1 text-left text-sm font-medium text-gray-500"
                      >
                        Preço
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-1 text-left text-sm font-medium text-gray-500"
                      >
                        Qtd.
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-1 text-left text-sm font-medium text-gray-500"
                      >
                        Total
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white text-xs">
                    {data?.items.map((item, index) => (
                      <tr
                        key={item.id}
                        className={`rounded-xl
                      ${index % 2 === 0 ? `bg-gray-100` : `bg-white`}
                    `}
                      >
                        <td className="px-6 py-2 truncate">
                          {item.device.code}
                        </td>
                        <td className="px-6 py-2 truncate">
                          {item.device.exhibition_description.toUpperCase()}
                        </td>
                        <td className="px-6 py-2">
                          {numberToBrazilianReal(item.device.un_price)}
                        </td>
                        <td className="px-6 py-2">{item.quantity}</td>
                        <td className="px-6 py-2">
                          {numberToBrazilianReal(item.price)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="border-2 py-3 text-sm text-gray-800 rounded-xl bg-gray-50 border-gray-200 border-dotted">
        <div className="flex flex-col px-3 items-end">
          <div className="flex flex-row w-1/4 px-5 justify-between">
            <span>Valor:</span>
            <span>{numberToBrazilianReal(data?.total)}</span>
          </div>
          <div className="flex flex-row w-1/4 px-5 justify-between">
            <span>Desconto:</span>
            <span>{numberToBrazilianReal(0)}</span>
          </div>
          <div className="flex flex-row w-1/4 px-5 justify-between">
            <span>Frete:</span>
            <span>{numberToBrazilianReal(0)}</span>
          </div>
          <div className="flex flex-row w-1/4 px-5 justify-between">
            <span>Encargos:</span>
            <span>{numberToBrazilianReal(0)}</span>
          </div>
          <div className="flex flex-row w-1/4 px-5 justify-between">
            <span>Total:</span>
            <span>{numberToBrazilianReal(data?.total)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
