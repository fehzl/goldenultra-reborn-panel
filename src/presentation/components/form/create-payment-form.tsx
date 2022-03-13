import { SaveOrderPayment } from '@/domain/usecases';
import { makeRemoteSaveOrderPayment } from '@/main/factories/usecases';
import { queryClient } from '@/pages/_app';
import { SelectInput } from '@/presentation/components/input/select-input';
import { TextInput } from '@/presentation/components/input/text-input';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';

interface Props {
  orderId: string;
  orderCode: string;
}

export function CreatePaymentForm({ orderId, orderCode }: Props) {
  const remoteSaveOrderPayment = makeRemoteSaveOrderPayment();

  const { register, setValue, watch, handleSubmit } = useForm();

  const mutation = useMutation(
    async (data: SaveOrderPayment.Params) =>
      await remoteSaveOrderPayment.save(data),
    {
      onSuccess: () => {
        queryClient.refetchQueries([`order`, orderCode]);
      },
    },
  );

  const onSubmit = async (data: any) => {
    const payment: SaveOrderPayment.Params = {
      orderId,
      method: data.method,
      amount: data.amount,
      identifier: data.identifier,
      situation: `PAID`,
      observation: data.observation,
    };

    mutation.mutate(payment);
  };

  const method = watch(`method`);

  return (
    <div className="bg-white h-24 border-2 border-dotted divide-x-2 rounded-lg flex flex-row px-4 py-4 items-center justify-center">
      <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-row items-center space-x-4 justify-center">
          <div className="w-2/12">
            <SelectInput
              name="method"
              label="Método"
              options={[
                { value: `PIX`, label: `PIX` },
                { value: `TED`, label: `TED` },
                { value: `DOC`, label: `DOC` },
                { value: `TICKET`, label: `Boleto` },
                { value: `CREDIT_CARD`, label: `Cartão de crédito` },
                { value: `DEBIT_CARD`, label: `Cartão de débito` },
                { value: `CASH`, label: `Dinheiro` },
                { value: `OTHER`, label: `Outro` },
              ]}
              setValue={setValue}
              value={method}
            />
          </div>
          <div className="w-1/12">
            <TextInput label="Valor" {...register(`amount`)} />
          </div>
          <div className="w-2/12">
            <TextInput label="Identificador" {...register(`identifier`)} />
          </div>
          <div className="w-min self-end">
            <button className="flex flex-row text-sm items-center justify-around px-2 py-1 transition-all ease-in duration-100 rounded-lg text-white font-bold h-10 w-10 bg-green-400 hover:bg-green-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
