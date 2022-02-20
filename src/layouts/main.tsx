import Header from '@/components/header/header';
import Sidebar from '@/components/sidebar/sidebar';
import { useSession } from 'next-auth/react';

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const { data: session, status } = useSession();

  return (
    <div className="flex flex-row min-h-screen max-h-full p-4 space-x-4 bg-gray-100 text-gray-800">
      <Sidebar />
      <main className="main space-y-4 overflow-hidden overflow-x-hidden flex flex-col flex-grow -ml-64 md:ml-0 transition-all duration-150 ease-in">
        {session && <Header session={session} />}
        <div className="bg-gray-200 min-h-full p-4 rounded-lg">{children}</div>
      </main>
    </div>
  );
}
