import { SaveOrderCharge } from '@/domain/usecases';
import { makeRemoteSaveOrderCharge } from '@/main/factories/usecases';
import { queryClient } from '@/pages/_app';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { SelectInput } from '../input/select-input';
import { TextInput } from '../input/text-input';
import { CurrencyInput } from '../input/currency-input';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

interface Props {
  order_id: string;
  order_code: string;
}

type FormData = {
  type: string;
  value: number;
  observation: string;
};

const schema = yup.object().shape({
  type: yup.string().required(`Obrigatório`),
  value: yup.string().required(`Obrigatório`),
  observation: yup.string().required(`Obrigatório`),
});

export function CreateChargeForm({ order_id, order_code }: Props) {
  const remoteSaveOrderCharge = makeRemoteSaveOrderCharge();

  const {
    register,
    setValue,
    watch,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const type = watch(`type`);

  const mutation = useMutation(
    async (data: SaveOrderCharge.Params) =>
      await remoteSaveOrderCharge.save(data),
    {
      onSuccess: () => {
        queryClient.refetchQueries([`order`, order_code]);
        reset();
      },
      onError: (error) => {
        alert(JSON.stringify(error));
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
        <div className="inline-flex items-center space-x-4">
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
            error={errors.type}
          />
          <CurrencyInput
            handleValue={(value) =>
              value ? setValue(`value`, value) : setValue(`value`, 0)
            }
            label="Valor"
            type="form"
            {...register(`value`)}
            error={errors.value}
          />
          <TextInput
            label="Observações"
            {...register(`observation`)}
            error={errors.observation}
          />
          <div className="w-min self-end">
            <button className="flex flex-row text-sm items-center justify-around h-10 w-10 ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-green-400 hover:text-green-300"
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
