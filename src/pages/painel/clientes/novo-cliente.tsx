import { CreateClientForm } from '@/presentation/components/form';
import { PageHeader, PageWrapper } from '@/presentation/components/shared';

export default function NewClient() {
  const sections = [
    {
      name: `Dados pessoais`,
      activeColor: `text-green-500`,
    },
  ];

  return (
    <>
      <PageHeader
        type="title-subtitle"
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
        titleText="Novo Cliente"
      />
      <PageWrapper sections={sections} activeSection={sections[0].name}>
        <div className="px-8">
          <CreateClientForm />
        </div>
      </PageWrapper>
    </>
  );
}
