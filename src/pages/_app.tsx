import { AppProps } from 'next/app';
import '@/styles/global.css';
import { SessionProvider } from 'next-auth/react';
import MainLayout from '@/layouts/main';
import { QueryClient, QueryClientProvider } from 'react-query';

export default function MyApp({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider session={pageProps.session}>
        <MainLayout>
          <Component {...pageProps} />
        </MainLayout>
      </SessionProvider>
    </QueryClientProvider>
  );
}
