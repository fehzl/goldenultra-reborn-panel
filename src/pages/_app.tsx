import { AppProps } from 'next/app';
import '@/presentation/styles/global.css';
import { SessionProvider } from 'next-auth/react';
import MainLayout from '@/presentation/layouts/main';
import { QueryClient, QueryClientProvider } from 'react-query';
import { useRouter } from 'next/router';

export const queryClient = new QueryClient();

export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider session={pageProps.session}>
        {!router.pathname.startsWith(`/painel/pedidos/i/`) &&
        router.pathname.match(`/painel`) ? (
          <MainLayout>
            <Component {...pageProps} />
          </MainLayout>
        ) : (
          <Component {...pageProps} />
        )}
      </SessionProvider>
    </QueryClientProvider>
  );
}
