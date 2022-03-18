function objectValues<T>(obj: T) {
  return Object.keys(obj).map((objKey) => obj[objKey as keyof T]);
}

function objectKeys<T>(obj: T) {
  return Object.keys(obj).map((objKey) => objKey as keyof T);
}

type PrimitiveType = string | symbol | number | boolean;

// Type guard for the primitive types which will support printing
// out of the box
function isPrimitive(value: any): value is PrimitiveType {
  return (
    typeof value === `string` ||
    typeof value === `number` ||
    typeof value === `boolean` ||
    typeof value === `symbol`
  );
}

interface MinTableItem {
  id: PrimitiveType;
}

type TableHeaders<T extends MinTableItem> = Record<keyof T, string>;

type CustomRenderers<T extends MinTableItem> = Partial<
  Record<keyof T, (it: T) => React.ReactNode>
>;

interface TableProps<T extends MinTableItem> {
  items: T[];
  headers: TableHeaders<T>;
  customRenderers?: CustomRenderers<T>;
  hideId?: boolean;
}

export default function Table<T extends MinTableItem>(props: TableProps<T>) {
  function renderRow(item: T) {
    return (
      <>
        {objectKeys(item).map((itemProperty, index) => {
          const customRenderer = props.customRenderers?.[itemProperty];

          if (customRenderer) {
            return <td>{customRenderer(item)}</td>;
          }

          if (props.hideId && index === 0) {
            return null;
          }

          return (
            <td key={index}>
              {isPrimitive(item[itemProperty]) ? item[itemProperty] : ``}
            </td>
          );
        })}
      </>
    );
  }

  return (
    <div className="border-2 rounded-lg border-dotted">
      <table className="min-w-full divide-y-2 divide-dotted text-center">
        <thead>
          <tr className="h-12">
            {objectValues(props.headers).map((headerValue, index) => {
              if (props.hideId && index === 0) {
                return null;
              }
              return (
                <th key={index}>
                  <div className="flex items-center justify-center">
                    <span className="font-normal text-sm text-gray-500">
                      {headerValue}
                    </span>
                  </div>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody className="text-sm">
          {props.items.map((item, index) => (
            <tr
              key={item.id as string}
              className={`h-12 text-gray-700 ${
                index % 2 === 0 ? `bg-gray-100` : ``
              }`}
            >
              {renderRow(item)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
