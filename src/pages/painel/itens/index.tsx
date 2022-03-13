import Link from 'next/link';
import { BiBox } from 'react-icons/bi';
import { useQuery } from 'react-query';
import { PageHeader } from '@/presentation/components/shared/page/header';
import { makeRemoteLoadDeviceList } from '@/main/factories/usecases';
import { PageWrapper } from '@/presentation/components/shared';
import ItemCard from '@/presentation/components/card/item-card';

export default function Items() {
  const remoteLoadDeviceList = makeRemoteLoadDeviceList();

  const { isLoading, data, isFetching } = useQuery(
    [`devices`],
    () => remoteLoadDeviceList.loadAll({ limit: 15 }),
    { keepPreviousData: true },
  );

  return (
    <>
      <PageHeader
        type="title-link"
        titleIcon={<BiBox />}
        titleText="Itens"
        linkHref="/painel/itens/novo-item"
        linkText="Novo"
      />
      <PageWrapper
        loading={isLoading || isFetching}
        actions={[]}
        sections={[]}
        activeSection={``}
        setActiveSection={() => ({})}
      >
        <div className="grid px-8 grid-cols-6 sm:grid-cols-3 lg:grid-cols-5 gap-12">
          {data?.map((device) => (
            <Link key={device.id} href={`itens/i/${device.alias}`} passHref>
              <a>
                <ItemCard key={device.id} device={device} />
              </a>
            </Link>
          ))}
        </div>
      </PageWrapper>
    </>
  );
}
