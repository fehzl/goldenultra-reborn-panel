import { AppProps } from 'next/app';
import '@/presentation/styles/global.css';
import { SessionProvider } from 'next-auth/react';
import MainLayout from '@/presentation/layouts/main';
import { QueryClient, QueryClientProvider } from 'react-query';
import { useRouter } from 'next/router';

export default function MyApp({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();
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
