import { useRouter } from 'next/router';
import { BiHash, BiShoppingBag } from 'react-icons/bi';
import { useQuery } from 'react-query';
import { PageHeader } from '@/presentation/components/shared/page/header';
import { PageWrapper } from '@/presentation/components/shared/page/wrapper';
import { ReactNode, useState } from 'react';
import {
  OrderChargersTab,
  OrderDetailsTab,
  OrderDispatchTab,
  OrderOverallTab,
  OrderPaymentTab,
  OrderSeparationTab,
} from '@/presentation/components/tab';
import { makeRemoteLoadOrder } from '@/main/factories/usecases';

export default function ShowOrder() {
  const router = useRouter();
  const { code: routerCode } = router.query;

  const remoteLoadOrder = makeRemoteLoadOrder();

  const sections = [
    { name: `Detalhes`, activeColor: `text-green-500` },
    { name: `Encargos`, activeColor: `text-blue-400` },
    { name: `Pagamentos`, activeColor: `text-blue-400` },
    { name: `Separação`, activeColor: `text-blue-400` },
    { name: `Expedição`, activeColor: `text-blue-400` },
    { name: `Situação`, activeColor: `text-blue-400` },
  ];

  const [activeSection, setActiveSection] = useState<string>(sections[0].name);

  const { data, isLoading } = useQuery(
    [`order`, routerCode],
    async () => await remoteLoadOrder.load(routerCode as string),
  );

  const renderTab = (): ReactNode => {
    if (data) {
      switch (activeSection) {
        case `Detalhes`:
          return <OrderDetailsTab data={data} />;
        case `Encargos`:
          return <OrderChargersTab data={data} />;
        case `Pagamentos`:
          return <OrderPaymentTab data={data} />;
        case `Separação`:
          return <OrderSeparationTab data={data} />;
        case `Expedição`:
          return <OrderDispatchTab data={data} />;
        case `Situação`:
          return <OrderOverallTab />;
        default:
          return <div>404</div>;
      }
    }
  };

  return (
    <>
      <PageHeader
        type="title-subtitle"
        titleIcon={<BiShoppingBag />}
        titleText={data?.code || ``}
        subtitleIcon={<BiHash />}
        subtitleText={data?.id}
      />
      <PageWrapper
        loading={isLoading}
        sections={sections}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      >
        <div className="space-y-10 px-9">{renderTab()}</div>
      </PageWrapper>
    </>
  );
}
