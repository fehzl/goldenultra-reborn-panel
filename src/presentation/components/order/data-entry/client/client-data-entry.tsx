import { RemoteLoadClientList } from '@/data/usecases/remote-load-client-list';
import { AxiosHttpClientAdapter } from '@/infra/http/axios-http-client-adapter';
import { useQuery } from 'react-query';
import { useState } from 'react';
import Select from '../../../input/select';

interface Props {
  client: any;
  setClient: (client: any) => void;
}

export function OrderClientDataEntry({ setClient }: Props) {
  const httpClient = new AxiosHttpClientAdapter();
  const url = `http://132.226.243.30:3333/api/v1/clients`;
  const remoteLoadClientList = new RemoteLoadClientList(url, httpClient);

  const [search, setSearch] = useState(``);
  const { data } = useQuery(
    [`clients`, search],
    async () => await remoteLoadClientList.loadAll({ search }),
    { keepPreviousData: true },
  );

  const chooseItem = (client: any): void => {
    setClient(client);
  };

  return (
    <>
      {data && (
        <Select
          data={data}
          label="Inserir Cliente"
          search={search}
          setSearch={setSearch}
          chooseItem={chooseItem}
          optionLabel={[`name`, `cpf`]}
        />
      )}
    </>
  );
}
