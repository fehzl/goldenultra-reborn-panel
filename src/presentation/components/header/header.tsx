import { Session } from 'next-auth';

export interface HeaderProps {
  session: Session;
}

export default function Header({ session }: HeaderProps) {
  return (
    <div className="h-22 px-16 py-4 bg-gray-100 flex flex-row justify-between items-center">
      <div className="left">
        <h1 className="text-3xl text-gray-800 font-bold tracking-tighter">
          Goldenultra
          <span className="text-green-500 text-4xl">.</span>
        </h1>
      </div>
      <div className="flex items-center flex-row space-x-3">
        <div className="flex flex-col text-right">
          <span className="text-sm text-gray-500">{session.user?.email}</span>
          <span className="text-sm text-gray-500">nível 1</span>
        </div>
      </div>
    </div>
  );
}
