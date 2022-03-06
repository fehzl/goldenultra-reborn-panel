import Link from 'next/link';
import { ReactNode } from 'react';

interface Props {
  type: 'title-link' | 'title-subtitle';
  linkText?: string;
  linkHref?: string;
  linkVariant?: 'success' | 'danger';
  titleText: string;
  titleIcon: ReactNode;
  subtitleIcon?: ReactNode;
  subtitleText?: string;
}

export function PageHeader({
  type,
  linkText,
  linkHref = `/`,
  linkVariant = `success`,
  titleIcon,
  titleText,
  subtitleIcon,
  subtitleText,
}: Props) {
  return (
    <div className="px-8 py-6 flex flex-row items-center justify-between h-24">
      <div className="flex items-center space-x-2">
        <div className="text-2xl text-gray-500">{titleIcon}</div>
        <div className="text-gray-500">{titleText}</div>
      </div>
      {(type === `title-link` && (
        <div className="flex items-center">
          <Link href={linkHref} passHref>
            <a>
              <button
                className={`flex flex-row text-sm items-center justify-around px-2 py-1 transition-all ease-in duration-100 rounded-lg text-white font-bold h-9 w-36 ${
                  linkVariant === `success`
                    ? `bg-green-400 hover:bg-green-300`
                    : `bg-red-400 hover:bg-red-300`
                }`}
              >
                {linkText}
              </button>
            </a>
          </Link>
        </div>
      )) || (
        <div className="flex items-center space-x-2">
          <div className="text-xl text-gray-300">{subtitleIcon}</div>
          <div className="text-gray-300 text-sm">{subtitleText}</div>
        </div>
      )}
    </div>
  );
}
