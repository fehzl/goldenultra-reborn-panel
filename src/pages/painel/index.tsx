import { CurrencyInput } from '@/presentation/components/input/currency-input/currrency-input';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';

export default function Painel() {
  return (
    <div className="px-14">
      <h1>
        <CurrencyInput />
      </h1>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session) {
    context.res.writeHead(302, {
      Location: `/`,
    });
    context.res.end();
  }

  return {
    props: {
      session,
    },
  };
};
