import { SaveOrderCharge } from '@/domain/usecases';
import { makeRemoteSaveOrderCharge } from '@/main/factories/usecases';
import { queryClient } from '@/pages/_app';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { SelectInput } from '../input/select-input';
import { TextInput } from '../input/text-input';

interface Props {
  order_id: string;
  order_code: string;
}

export function CreateChargeForm({ order_id, order_code }: Props) {
  const remoteSaveOrderCharge = makeRemoteSaveOrderCharge();

  const { register, setValue, watch, handleSubmit } = useForm();

  const type = watch(`type`);

  const mutation = useMutation(
    async (data: SaveOrderCharge.Params) =>
      await remoteSaveOrderCharge.save(data),
    {
      onSuccess: () => {
        queryClient.refetchQueries([`order`, order_code]);
      },
    },
  );

  const onSubmit = async (data: any) => {
    const charge: SaveOrderCharge.Params = {
      order_id,
      type: data.type,
      value: data.value,
    };

    mutation.mutateAsync(charge);
  };

  return (
    <div className="bg-white h-24 border-2 border-dotted divide-x-2 rounded-lg flex flex-row px-4 py-4 items-center justify-center">
      <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-row items-center space-x-4 justify-center">
          <div className="w-2/12">
            <SelectInput
              name="type"
              label="Tipo"
              options={[
                { value: `TAX_REPLACEMENT`, label: `Substituição Tributária` },
                { value: `FREIGHT`, label: `Frete` },
                { value: `OTHER`, label: `Outro` },
              ]}
              value={type}
              setValue={setValue}
            />
          </div>
          <div className="w-1/12">
            <TextInput label="Valor" {...register(`value`)} />
          </div>
          <div className="w-2/12">
            <TextInput label="Observações" {...register(`observation`)} />
          </div>
          <div className="w-min self-end">
            <button className="flex flex-row text-sm items-center justify-around transition-all ease-in duration-100 rounded-lg text-white font-bold h-10 w-10 bg-green-400 hover:bg-green-300">
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
