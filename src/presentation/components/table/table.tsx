import { HiOutlineTrash } from 'react-icons/hi';

type Column = {
  label: string;
  width: string;
  key: string;
};

interface Props<T> {
  columns: Column[];
  data: T[];
  actions?: {
    onDelete: (id: string) => void;
  };
  hasCheckboxes?: boolean;
}

export function Table({ columns, actions, data }: Props<any>) {
  return (
    <div className="border-2 rounded-lg border-dotted">
      <table className="min-w-full divide-y-2 divide-dotted text-center">
        <thead>
          <tr className="h-12">
            {columns.map((column) => (
              <th key={column.label} className={`w-${column.width} `}>
                <div className="flex items-center justify-center">
                  <span className="font-normal text-sm text-gray-500">
                    {column.label}
                  </span>
                </div>
              </th>
            ))}
            {actions && (
              <th className="w-1/6">
                <div className="flex items-center justify-center">
                  <span className="font-normal text-sm text-gray-500">
                    Gerenciar
                  </span>
                </div>
              </th>
            )}
          </tr>
        </thead>
        <tbody className="text-sm">
          {data.length > 0 ? (
            <>
              {data.map((item, index) => (
                <tr
                  key={item.key}
                  className={`${
                    index % 2 === 0 ? `bg-gray-100` : `bg-white`
                  } h-12`}
                >
                  {columns.map((column) => (
                    <td key={column.key} className={`text-gray-700`}>
                      {item[column.key]}
                    </td>
                  ))}
                  {actions && (
                    <td className="px-3 py-2">
                      <button
                        onClick={() => {
                          if (actions && actions.onDelete) {
                            actions.onDelete(item.id);
                          }
                        }}
                      >
                        <span className="text-red-500 text-lg">
                          <HiOutlineTrash />
                        </span>
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </>
          ) : (
            <tr>
              <td
                colSpan={actions ? columns.length + 1 : columns.length}
                className="p-4 truncate"
              >
                <span className="text-gray-500">
                  Nenhuma inserção localizada
                </span>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
