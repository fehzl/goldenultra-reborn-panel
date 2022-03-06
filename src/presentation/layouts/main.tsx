import Header from '@/presentation/components/shared/header/header';
import Sidebar from '@/presentation/components/shared/sidebar/sidebar';
import { useSession } from 'next-auth/react';

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const { data: session } = useSession();

  return (
    <div className="flex divide-x overflow-hidden max-h-screen divide-slate-300 flex-row min-h-screen bg-gray-100 text-gray-800">
      <Sidebar />
      <main className="divide-y divide-slate-300 main overflow-hidden flex flex-col flex-grow transition-all duration-150 ease-in">
        {session && <Header session={session} />}
        <div className="overflow-y-auto">{children}</div>
      </main>
    </div>
  );
}
