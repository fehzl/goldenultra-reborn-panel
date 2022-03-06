import { ReactNode } from 'react';

type Section = {
  name: string;
  activeColor: string;
};

type Action = {
  name: string;
  icon: ReactNode;
};

interface Props {
  children: ReactNode;
  loading?: boolean;
  sections?: Section[];
  activeSection?: string;
  setActiveSection?: (section: string) => void;
  actions?: Action[];
}

export function PageWrapper({
  children,
  loading,
  sections = [],
  activeSection = ``,
  setActiveSection = () => ({}),
  actions = [],
}: Props) {
  return (
    <div className="px-8">
      <div className="flex flex-col w-full h-full">
        {loading ? (
          <div className="flex w-full min-h-full justify-center items-center">
            <div>Carregando...</div>
          </div>
        ) : (
          <div className="rounded-xl border-2 mb-8 border-gray-200 bg-white">
            <div className="px-9 flex flex-row h-20 items-center justify-between rounded-t-xl border-b-2 border-gray-200">
              <div className="flex flex-row items-center space-x-4 h-full">
                {sections.map((section) => (
                  <div
                    key={section.name}
                    className={` cursor-pointer text-sm ${
                      activeSection === section.name
                        ? `font-bold ${section.activeColor}`
                        : `font-normal text-gray-500`
                    }`}
                    onClick={() => setActiveSection(section.name)}
                  >
                    <button>{section.name}</button>
                  </div>
                ))}
              </div>
              <div className="flex flex-row space-x-6">
                {actions.map((action) => (
                  <div
                    key={action.name}
                    className="flex flex-row space-x-2 items-center text-gray-400 hover:text-gray-500 cursor-pointer"
                    onClick={() => ({})}
                  >
                    <span className="text-xl">{action.icon}</span>
                    <span className="text-sm">{action.name}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="py-8">{children}</div>
          </div>
        )}
      </div>
    </div>
  );
}
