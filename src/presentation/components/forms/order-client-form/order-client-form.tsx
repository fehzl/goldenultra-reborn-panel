import { RemoteLoadClientList } from '@/data/usecases/remote-load-client-list';
import { AxiosHttpClientAdapter } from '@/infra/http/axios-http-client-adapter';
import { useForm } from 'react-hook-form';
import { useQuery } from 'react-query';

interface Props {
  client: any;
  setClient: (client: any) => void;
}

export function OrderClientForm({ client, setClient }: Props) {
  const httpClient = new AxiosHttpClientAdapter();
  const url = `http://localhost:3333/api/v1/clients`;
  const remoteLoadClientList = new RemoteLoadClientList(url, httpClient);

  const { register, reset, watch } = useForm();

  const search = watch(`code`);

  const { data } = useQuery(
    [`clients`, search],
    async () => await remoteLoadClientList.loadAll({ search }),
    { keepPreviousData: true },
  );

  const chooseItem = (client: any): void => {
    reset();
    setClient(client);
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
            {data?.map((client) => (
              <div
                onClick={() => chooseItem(client)}
                key={client.id}
                className="hover:bg-blue-100"
              >
                <span className="text-sm px-3 text-gray-700">
                  {client.name} - {client.cpf}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </form>
  );
}
