import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { makeRemoteSaveClient } from '@/main/factories/usecases';
import { useRouter } from 'next/router';
import { SaveClient } from '@/domain/usecases';
import { TextInput } from '../input/text-input';
import { SelectInput } from '../input/select-input';

const schema = yup.object().shape({
  name: yup.string().required(`O nome é obrigatório`),
  email: yup
    .string()
    .email(`E-mail inválido`)
    .required(`O e-mail é obrigatório`),
  type: yup.string().required(`O tipo é obrigatório`),
  rg: yup.string().when(`type`, {
    is: `individual`,
    then: yup.string().required(`O RG é obrigatório`),
  }),
  cpf: yup.string().when(`type`, {
    is: `individual`,
    then: yup.string().required(`O CPF é obrigatório`),
  }),
  ie: yup.string().when(`type`, {
    is: `company`,
    then: yup.string().required(`A IE é obrigatória`),
  }),
  cnpj: yup.string().when(`type`, {
    is: `company`,
    then: yup.string().required(`O CNPJ é obrigatório`),
  }),
  cep: yup.string().required(`O CEP é obrigatório`),
  street: yup.string().required(`A rua é obrigatória`),
  number: yup.string().required(`O número é obrigatório`),
  phoneType: yup.string().required(`O telefone é obrigatório`),
  city: yup.string().required(`A cidade é obrigatória`),
  uf: yup.string().required(`O estado é obrigatório`),
  neighborhood: yup.string().required(`O bairro é obrigatório`),
  phone: yup.string().required(`O telefone é obrigatório`),
  addressType: yup.string().required(`O tipo de endereço é obrigatório`),
});

export function CreateClientForm() {
  const router = useRouter();

  const remoteSaveClient = makeRemoteSaveClient();

  const [lookingForCEP, setLookingForCEP] = useState(false);

  const onSubmit = async (data: any) => {
    const client: SaveClient.Params = {
      type: `individual`,
      name: data.name,
      email: data.email,
      RG: data.rg,
      CPF: data.cpf,
      address: {
        street: data.street,
        number: data.number,
        complement: `B`,
        reference: `Loja B`,
        CEP: data.cep,
        city: data.city,
        UF: data.uf,
        neighborhood: data.neighborhood,
        type: data.addressType,
        isPrimary: true,
      },
      phone: {
        number: data.phone,
        type: data.phoneType,
        isPrimary: true,
      },
    };
    const response = await remoteSaveClient.save(client);

    response.id
      ? router.push(
          `/painel/clientes/c/[id]`,
          `/painel/clientes/c/${response.id}`,
        )
      : null;
  };

  const {
    handleSubmit,
    register,
    formState: { errors },
    watch,
    setValue,
  } = useForm({ resolver: yupResolver(schema) });

  const CEP = watch(`cep`);

  useEffect(() => {
    if (CEP && CEP.length === 8) {
      setLookingForCEP(true);
      const cep = CEP.replace(/\D/g, ``);
      const url = `https://viacep.com.br/ws/${cep}/json/`;

      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          setLookingForCEP(false);
          setValue(`street`, data.logradouro);
          setValue(`neighborhood`, data.bairro);
          setValue(`uf`, data.uf);
          setValue(`city`, data.localidade);
        });
    } else {
      setValue(`street`, ``);
      setValue(`neighborhood`, ``);
      setValue(`uf`, ``);
      setValue(`city`, ``);
    }
  }, [CEP, setValue]);

  const type = watch(`type`);
  const phoneType = watch(`phoneType`);
  const addressType = watch(`addressType`);

  return (
    <form
      noValidate
      className="flex flex-col space-y-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="grid grid-cols-6 gap-6">
        <div className="col-span-1">
          <TextInput
            label="Nome"
            {...register(`name`)}
            error={errors.name ? `${errors.name.message}` : undefined}
          />
        </div>
        <div className="col-span-1">
          <TextInput
            label="E-mail"
            {...register(`email`)}
            error={errors.email ? `${errors.email.message}` : undefined}
          />
        </div>
      </div>
      <div className="grid grid-cols-6 gap-6">
        <SelectInput
          name="type"
          label="Tipo"
          options={[
            { value: `individual`, label: `Pessoa Física` },
            { value: `company`, label: `Pessoa Jurídica` },
          ]}
          setValue={setValue}
          value={type}
          error={errors.type ? `${errors.type.message}` : undefined}
        />
        {type === `individual` ? (
          <>
            <div className="col-span-1">
              <TextInput
                label="RG"
                {...register(`rg`)}
                error={errors.rg ? `${errors.rg.message}` : undefined}
              />
            </div>
            <div className="col-span-1">
              <TextInput
                label="CPF"
                {...register(`cpf`)}
                error={errors.cpf ? `${errors.cpf.message}` : undefined}
              />
            </div>
          </>
        ) : type === `company` ? (
          <>
            <div className="col-span-1">
              <TextInput
                label="IE"
                {...register(`ie`)}
                error={errors.ie ? `${errors.ie.message}` : undefined}
              />
            </div>
            <div className="col-span-1">
              <TextInput
                label="CNPJ"
                {...register(`cnpj`)}
                error={errors.cnpj ? `${errors.cnpj.message}` : undefined}
              />
            </div>
          </>
        ) : null}
      </div>
      <div className="grid grid-cols-6 gap-6">
        <div className="col-span-1">
          <TextInput
            label="Tel."
            {...register(`phone`)}
            error={errors.phone ? `${errors.phone.message}` : undefined}
          />
        </div>
        <div className="col-span-1">
          <SelectInput
            name="phoneType"
            label="Tipo"
            options={[
              { value: `mobile`, label: `Celular` },
              { value: `home`, label: `Residencial` },
              { value: `work`, label: `Comercial` },
            ]}
            setValue={setValue}
            value={phoneType}
            error={errors.phoneType ? `${errors.phoneType.message}` : undefined}
          />
        </div>
      </div>
      <div className="grid grid-cols-6 gap-6">
        <div className="col-span-1">
          <TextInput
            label={lookingForCEP ? `Buscando CEP` : `CEP`}
            {...register(`cep`)}
            error={errors.cep ? `${errors.cep.message}` : undefined}
          />
        </div>
        <div className="col-span-1">
          <SelectInput
            label="Tipo"
            options={[
              { value: `home`, label: `Residencial` },
              { value: `work`, label: `Comercial` },
            ]}
            name="addressType"
            setValue={setValue}
            value={addressType}
            error={
              errors.addressType ? `${errors.addressType.message}` : undefined
            }
          />
        </div>
      </div>
      <div className="grid grid-cols-6 gap-6">
        <div className="col-span-1">
          <TextInput
            label="Endereço"
            {...register(`street`)}
            error={errors.street ? `${errors.street.message}` : undefined}
          />
        </div>
        <div className="col-span-1">
          <TextInput
            label="Número"
            {...register(`number`)}
            error={errors.number ? `${errors.number.message}` : undefined}
          />
        </div>
        <div className="col-span-1">
          <TextInput
            label="Complemento"
            {...register(`complement`)}
            error={
              errors.complement ? `${errors.complement.message}` : undefined
            }
          />
        </div>
      </div>
      <div className="grid grid-cols-6 gap-6">
        <div className="col-span-1">
          <TextInput
            label="Bairro"
            {...register(`neighborhood`)}
            error={
              errors.neighborhood ? `${errors.neighborhood.message}` : undefined
            }
          />
        </div>
        <div className="col-span-1">
          <TextInput
            label="Cidade"
            {...register(`city`)}
            error={errors.city ? `${errors.city.message}` : undefined}
          />
        </div>
        <div className="col-span-1">
          <TextInput
            label="UF"
            {...register(`uf`)}
            error={errors.uf ? `${errors.uf.message}` : undefined}
          />
        </div>
      </div>
      <div className="grid grid-cols-6 gap-6">
        <div className="col-span-3">
          <TextInput
            label="Referência"
            {...register(`reference`)}
            error={errors.reference ? `${errors.reference.message}` : undefined}
          />
        </div>
      </div>
      <div className="col-span-1"></div>
      <div className="flex justify-center">
        <button
          type="button"
          onClick={() => router.back()}
          className="flex flex-row text-sm items-center justify-around px-2 py-1 transition-all ease-in duration-100 rounded-l-lg text-white font-bold h-10 w-10 bg-red-400 hover:bg-red-300"
        >
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
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <button className="flex flex-row text-sm items-center justify-around px-2 py-1 transition-all ease-in duration-100 rounded-r-lg text-white font-bold h-10 w-10 bg-green-400 hover:bg-green-300">
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
    </form>
  );
}
