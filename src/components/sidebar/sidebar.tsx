import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { BiBox, BiDetail, BiHomeAlt, BiShoppingBag } from 'react-icons/bi';

export default function Sidebar() {
  const router = useRouter();

  const [activeRoute, setActiveRoute] = useState<string>(``);

  const paths = [
    {
      path: `/painel`,
      icon: <BiHomeAlt className="text-2xl" />,
      name: `Painel`,
    },
    {
      path: `/painel/itens`,
      icon: <BiBox className="text-2xl" />,
      name: `Itens`,
    },
    {
      path: `/painel/pedidos`,
      icon: <BiShoppingBag className="text-2xl" />,
      name: `Pedidos`,
    },
  ];

  const renderPaths = () => {
    return (
      <>
        {paths.map((path) => (
          <li key={path.name} className="my-px">
            <Link href={path.path}>
              <a
                className={`flex flex-row items-center h-10 px-3 rounded-lg ${
                  activeRoute === path.path
                    ? `bg-green-50 text-green-500`
                    : `text-green-50 hover:bg-green-50 hover:text-green-500`
                }`}
              >
                <span className="flex items-center justify-center text-lg">
                  {path.icon}
                </span>
              </a>
            </Link>
          </li>
        ))}
      </>
    );
  };

  // TODO: quando atualiza a página ele não atualiza o activeRoute
  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      router.events.on(`routeChangeComplete`, (url) => {
        setActiveRoute(url);
      });
    }
    return () => {
      isMounted = false;
    };
  }, [router]);

  return (
    <aside className="sidebar w-22 rounded-lg md:shadow transform -translate-x-full md:translate-x-0 transition-transform duration-150 ease-in bg-green-500">
      <div className="sidebar-header flex items-center justify-center py-4">
        <div className="inline-flex">
          <div className="inline-flex flex-row items-center">
            <svg
              className="w-10 h-10 text-green-100"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M11.757 2.034a1 1 0 01.638.519c.483.967.844 1.554 1.207 2.03.368.482.756.876 1.348 1.467A6.985 6.985 0 0117 11a7.002 7.002 0 01-14 0c0-1.79.684-3.583 2.05-4.95a1 1 0 011.707.707c0 1.12.07 1.973.398 2.654.18.374.461.74.945 1.067.116-1.061.328-2.354.614-3.58.225-.966.505-1.93.839-2.734.167-.403.356-.785.57-1.116.208-.322.476-.649.822-.88a1 1 0 01.812-.134zm.364 13.087A2.998 2.998 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879.586.585.879 1.353.879 2.121s-.293 1.536-.879 2.121z"
                clipRule="evenodd"
              />
            </svg>
            <span className="leading-10 text-gray-100 text-2xl font-bold ml-1 uppercase"></span>
          </div>
        </div>
      </div>
      <div className="sidebar-content px-4 py-6">
        <ul className="flex flex-col w-full space-y-2">{renderPaths()}</ul>
      </div>
    </aside>
  );
}
