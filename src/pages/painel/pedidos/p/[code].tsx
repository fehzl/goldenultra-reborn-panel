import { RemoteLoadOrder } from '@/data/usecases';
import { AxiosHttpClientAdapter } from '@/infra/http/axios-http-client-adapter';
import { useRouter } from 'next/router';
import { BiHash, BiShoppingBag } from 'react-icons/bi';
import { useQuery } from 'react-query';
import { PageHeader } from '@/presentation/components/shared/page/header';
import { PageWrapper } from '@/presentation/components/shared/page/wrapper';
import {
  OrderClientCard,
  OrderDetailsCard,
  OrderItemList,
} from '@/presentation/components/order';

export default function ShowOrder() {
  const router = useRouter();
  const { code: routerCode } = router.query;

  const httpClient = new AxiosHttpClientAdapter();
  const url = `http://132.226.243.30:3333/api/v1/orders/${routerCode}`;
  const remoteLoadOrder = new RemoteLoadOrder(url, httpClient);

  const sections = [
    { name: `Detalhes`, activeColor: `text-green-500` },
    { name: `Pagamentos`, activeColor: `text-orange-400` },
    { name: `Finalizados`, activeColor: `text-red-400` },
  ];

  const { data, isLoading, isFetching } = useQuery(
    [`order`, routerCode],
    async () => await remoteLoadOrder.load(routerCode as string),
  );

  return (
    <>
      <PageHeader
        type="title-subtitle"
        titleIcon={<BiShoppingBag />}
        titleText={data?.code || ``}
        subtitleIcon={<BiHash />}
        subtitleText={data?.id}
      />
      <PageWrapper loading={isLoading || isFetching} sections={sections}>
        <div className="flex flex-col space-y-10 px-9">
          {data && (
            <>
              <OrderDetailsCard order={data} />
              <OrderClientCard client={data.client} />
              <OrderItemList items={data.items} />
            </>
          )}
        </div>
      </PageWrapper>
    </>
  );
}
