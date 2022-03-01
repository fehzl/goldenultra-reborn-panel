import Header from '@/presentation/components/header/header';
import Sidebar from '@/presentation/components/sidebar/sidebar';
import { useSession } from 'next-auth/react';

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const { data: session, status } = useSession();

  return (
    <div className="flex divide-x overflow-hidden max-h-screen divide-slate-300 flex-row min-h-screen bg-gray-100 text-gray-800">
      <Sidebar />
      <main className="divide-y divide-slate-300 main overflow-hidden overflow-x-hidden flex flex-col flex-grow -ml-64 md:ml-0 transition-all duration-150 ease-in">
        {session && <Header session={session} />}
        <div className="p-4 overflow-y-auto">{children}</div>
      </main>
    </div>
  );
}
