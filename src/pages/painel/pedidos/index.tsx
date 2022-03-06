import { useState } from 'react';
import { BiFilter, BiPrinter, BiShoppingBag } from 'react-icons/bi';
import { useQuery } from 'react-query';
import { makeRemoteLoadOrderList } from '@/main/factories/usecases';
import { PageHeader } from '@/presentation/components/shared/page/header';
import { PageWrapper } from '@/presentation/components/shared/page/wrapper';
import { OrderList } from '@/presentation/components/order';

export default function Orders() {
  const remoteLoadOrderList = makeRemoteLoadOrderList();
  const { isLoading, data, isFetching } = useQuery(
    [`orders`],
    async () => await remoteLoadOrderList.loadAll(),
  );

  const sections = [
    { name: `Novos`, activeColor: `text-green-500` },
    { name: `Em curso`, activeColor: `text-orange-400` },
    { name: `Finalizados`, activeColor: `text-red-400` },
  ];
  const [activeSection, setActiveSection] = useState<string>(sections[0].name);

  const actions = [
    { name: `Filtrar`, icon: <BiFilter /> },
    { name: `Exportar`, icon: <BiPrinter /> },
  ];

  return (
    <>
      <PageHeader
        type="title-link"
        titleIcon={<BiShoppingBag />}
        titleText="Pedidos"
        linkHref="/painel/pedidos/novo-pedido"
        linkText="Novo"
      />
      <PageWrapper
        loading={isLoading || isFetching}
        sections={sections}
        actions={actions}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      >
        <OrderList orders={data || []} />
      </PageWrapper>
    </>
  );
}
