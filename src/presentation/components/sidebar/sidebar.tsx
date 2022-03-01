import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { BiBox, BiHomeAlt, BiShoppingBag } from 'react-icons/bi';
import { AiOutlineUser } from 'react-icons/ai';
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
    {
      path: `/painel/clientes`,
      icon: <AiOutlineUser className="text-2xl" />,
      name: `Usuários`,
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
                    ? `bg-green-500 text-green-50`
                    : `text-green-500 hover:bg-green-50 hover:text-green-500`
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
    <aside className="w-22 transform -translate-x-full md:translate-x-0 transition-transform duration-150 ease-in bg-gray-100 max-w-screen flex justify-center items-center">
      <div className="sidebar-content px-4 py-6">
        <ul className="flex flex-col w-full space-y-2">{renderPaths()}</ul>
      </div>
    </aside>
  );
}
