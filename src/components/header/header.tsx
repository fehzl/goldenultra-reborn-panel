import { Session } from 'next-auth';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export interface HeaderProps {
  session: Session;
}

export default function Header({ session }: HeaderProps) {
  const router = useRouter();

  const [activeRoute, setActiveRoute] = useState<string>(``);

  useEffect(() => {
    // regex to mantain only the second word of the path
    let isMounted = true;
    if (isMounted) {
      router.events.on(`routeChangeComplete`, (url) => {
        if (url !== `/painel`) {
          url = url.replace(/^\/+|\/+$/g, ``).split(`/`)[1];
          url = url.charAt(0).toUpperCase() + url.slice(1);
          setActiveRoute(url);
        } else {
          setActiveRoute(``);
        }
      });
    }
    return () => {
      isMounted = false;
    };
  }, [router]);

  return (
    <div className="h-16 rounded-lg px-4 py-2 bg-gray-200 flex flex-row justify-between items-center">
      <div className="left">
        <h1 className="text-3xl text-gray-800 font-bold tracking-tighter">
          Goldenultra
          <span className="text-green-500 text-4xl">.</span>
          <span className="text-gray-600">
            {activeRoute !== `/painel` ? activeRoute : ``}
          </span>
        </h1>
      </div>
      <div className="flex flex-col">
        <span>{session.user?.email}</span>
        <span>nível 1</span>
      </div>
    </div>
  );
}
