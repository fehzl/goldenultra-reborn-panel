import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import { useQuery } from 'react-query';
import { numberToBrazilianReal } from '@/utils/formatters';
import { Device } from '@/types';

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

const options = [
  {
    code: `123`,
    exhibition_description: `Item 1`,
    un_price: 12,
  },
  {
    code: `456`,
    exhibition_description: `Item 2`,
    un_price: 14,
  },
  {
    code: `789`,
    exhibition_description: `Item 3`,
    un_price: 26,
  },
];

export function OrderItemsForm({ items, setItems }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(OrderItemsSchema),
  });

  const [search, setSearch] = useState(``);

  const fetchDevices = async (search = ``) =>
    await axios.get<any>(
      `http://localhost:3333/api/v1/devices?search=${search}&availableToSell=true&limit=5`,
    );

  const { isLoading, data, isFetching } = useQuery(
    [`devices`, search],
    () => fetchDevices(search),
    { keepPreviousData: true },
  );

  const alreadyExists = (code: string): boolean => {
    return items.some((item) => item.device.code === code);
  };

  const onSubmit = (data: any): void => {
    if (alreadyExists(data.code)) {
      setError(`code`, {
        type: `manual`,
        message: `item já adicionado`,
      });
      return;
    }

    const orderItem = {
      device: {
        code: data.code,
        exhibition_description: data.item,
        un_price: parseInt(data.price),
      },
      quantity: parseInt(data.qtd),
      price: data.qtd * data.price,
    };
    reset();
    setItems([...items, orderItem]);
  };

  const autocomplete = (code: string): void => {
    setSearch(code);
    if (data?.data.data.length && data?.data.data[0].alias === code) {
      setValue(`item`, data?.data.data[0].exhibition_description);
      setValue(`price`, data?.data.data[0].un_price);
      clearErrors(`code`);
    } else {
      setValue(`item`, ``);
      setValue(`price`, ``);
      setError(`code`, {
        type: `manual`,
        message: `item não encontrado`,
      });
    }
  };

  const chooseItem = (device: Device): void => {
    setSearch(``);
    setValue(`code`, ``);

    const item = {
      device,
      quantity: 0,
      price: device.un_price,
    };

    if (alreadyExists(device.code)) {
      setError(`code`, {
        type: `manual`,
        message: `item já adicionado`,
      });
      return;
    }

    setItems([...items, item]);
  };

  return (
    <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-row">
        <div className="flex relative flex-col w-full space-y-1">
          <label htmlFor="code" className="text-sm text-gray-500">
            Pesquisar
          </label>
          <input
            {...register(`code`)}
            onChange={(e) => {
              autocomplete(e.target.value);
            }}
            autoComplete="off"
            className={`text-sm px-3 text-gray-700 h-8 border-gray-200 w-full ${
              search.length > 1
                ? `border-2 rounded-t-lg`
                : `border-2 rounded-lg`
            } focus:outline-none`}
          />
          {/*           {errors.code && (
            <span className="text-red-400 top-14 text-xs absolute">
              {errors.code.message}
            </span>
          )} */}
        </div>
      </div>
      {search.length > 1 && data?.data.data.length > 0 && (
        <div className="py-1 border-2 border-t-0 rounded-b-lg border-gray-200 cursor-pointer">
          <div className="flex flex-col space-y-2 bg-white">
            {data?.data.data.map((item: any) => (
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
