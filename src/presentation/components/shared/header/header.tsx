import { Session } from 'next-auth';
import { Logo } from '../logo';

export interface HeaderProps {
  session: Session;
}

export default function Header({ session }: HeaderProps) {
  return (
    <div className="py-4 px-8 bg-gray-100 flex flex-row justify-between items-center">
      <Logo />
      <div className="flex items-center flex-row space-x-3">
        <div className="flex flex-col text-right">
          <span className="text-sm text-gray-500">{session.user?.email}</span>
          <span className="text-sm text-gray-500">nível 1</span>
        </div>
      </div>
    </div>
  );
}
