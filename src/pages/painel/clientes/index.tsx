import { makeRemoteLoadClientList } from '@/main/factories/usecases';
import { ClientList } from '@/presentation/components/list';
import { PageHeader, PageWrapper } from '@/presentation/components/shared';
import { useState } from 'react';
import { BiFilter } from 'react-icons/bi';
import { useQuery } from 'react-query';

export default function Clients() {
  const remoteLoadClientList = makeRemoteLoadClientList();
  const { isLoading, data, isFetching } = useQuery(
    [`clients`],
    async () => await remoteLoadClientList.loadAll(),
  );

  const sections = [{ name: `Todos`, activeColor: `text-green-500` }];

  const [activeSection, setActiveSection] = useState<string>(sections[0].name);

  const actions = [{ name: `Filtrar`, icon: <BiFilter /> }];

  return (
    <>
      <PageHeader
        type="title-link"
        titleIcon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
        }
        titleText="Clientes"
        linkHref="/painel/clientes/novo-cliente"
        linkText="Novo"
      />
      <PageWrapper
        loading={isLoading || isFetching}
        sections={sections}
        actions={actions}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      >
        <ClientList clients={data || []} />
      </PageWrapper>
    </>
  );
}
