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
      <tr>
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
      </tr>
    );
  }

  return (
    <table>
      <thead>
        {objectValues(props.headers).map((headerValue, index) => {
          if (props.hideId && index === 0) {
            return null;
          }
          return <th key={index}>{headerValue}</th>;
        })}
      </thead>
      <tbody>{props.items.map(renderRow)}</tbody>
    </table>
  );
}
