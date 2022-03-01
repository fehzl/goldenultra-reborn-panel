import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useQuery } from 'react-query';
import { numberToBrazilianReal } from '@/presentation/utils/formatters';
import { AxiosHttpClientAdapter } from '@/infra/http/axios-http-client-adapter';
import { RemoteLoadDeviceList } from '@/data/usecases/remote-load-device-list';
import { DeviceModel } from '@/domain/models';

interface Props {
  items: any[];
  setItems: (items: any[]) => void;
}

const OrderItemsSchema = yup.object().shape({
  code: yup.string().required(`obrigatório`),
  item: yup.string().required(`obrigatório`),
  qtd: yup.number().required(`obrigatório`).typeError(`obrigatório`),
  price: yup.number().required(`obrigatório`).typeError(`obrigatório`),
});

export function OrderItemsForm({ items, setItems }: Props) {
  const httpClient = new AxiosHttpClientAdapter();
  const url = `http://localhost:3333/api/v1/devices`;
  const remoteLoadDeviceList = new RemoteLoadDeviceList(url, httpClient);

  const { register, setError, reset, watch } = useForm({
    resolver: yupResolver(OrderItemsSchema),
  });

  const search = watch(`code`);

  const { data } = useQuery(
    [`devices`, search],
    async () => await remoteLoadDeviceList.loadAll({ search, limit: 5 }),
    { keepPreviousData: true },
  );

  const alreadyExists = (code: string): boolean => {
    return items.some((item) => item.device.code === code);
  };

  const chooseItem = (device: DeviceModel): void => {
    reset();

    if (alreadyExists(device.code)) {
      setError(`code`, {
        type: `manual`,
        message: `item já adicionado`,
      });
      return;
    }

    const item = {
      device,
      quantity: 0,
      price: device.un_price,
    };

    setItems([...items, item]);
  };

  return (
    <form className="w-full">
      <div className="flex flex-row">
        <div className="flex relative flex-col w-full space-y-1">
          <label htmlFor="code" className="text-sm text-gray-500">
            Pesquisar
          </label>
          <input
            {...register(`code`)}
            autoComplete="off"
            className={`text-sm px-3 text-gray-700 h-8 border-gray-200 w-full ${
              search ? `border-2 rounded-t-lg` : `border-2 rounded-lg`
            } focus:outline-none`}
          />
        </div>
      </div>
      {search && (
        <div className="py-1 border-2 border-t-0 rounded-b-lg border-gray-200 cursor-pointer">
          <div className="flex flex-col space-y-2 bg-white">
            {data?.map((item) => (
              <div
                onClick={() => chooseItem(item)}
                key={item.code}
                className="hover:bg-blue-100"
              >
                <span className="text-sm px-3 text-gray-700">
                  {item.code} - {item.exhibition_description} -{` `}
                  {numberToBrazilianReal(item.un_price)}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </form>
  );
}
