import { OrderItem } from '@/types';
import { numberToBrazilianReal } from '@/utils/formatters';
import { FiEdit, FiMinus, FiPlus, FiTrash } from 'react-icons/fi';

interface OrderItemsTableProps {
  items: OrderItem[];
  hideHeader?: boolean;
  hideActions?: boolean;
  increase: (alias: string) => void;
  decrease: (alias: string) => void;
  change: (alias: string, quantity: number) => void;
  remove: (alias: string) => void;
}

export function OrderItems({
  items,
  hideHeader,
  hideActions,
  increase,
  decrease,
  change,
  remove,
}: OrderItemsTableProps) {
  return (
    <div className="min-w-full">
      {!hideHeader && (
        <div className="flex flex-row space-x-2">
          <div className="flex justify-center flex-col w-28 space-y-1">
            <span className="flex items-center text-sm px-3 text-gray-700 border-2 rounded-lg h-8 border-transparent w-28">
              Código
            </span>
          </div>
          <div className="flex justify-center flex-col w-full space-y-1">
            <span className="flex items-center text-sm px-3 text-gray-700 border-2 rounded-lg h-8 border-transparent w-full">
              Item
            </span>
          </div>
          <div className="flex justify-center flex-col w-28 space-y-1">
            <div className="flex flex-col justify-center text-sm px-3 text-gray-700 border-2 rounded-lg border-transparent w-28">
              Preço Un.
            </div>
          </div>
          <div className="flex justify-center flex-col text-center w-28 space-y-1">
            <div className="flex flex-col justify-center text-sm px-3 text-gray-700 border-2 rounded-lg border-transparent w-28">
              Qtd.
            </div>
          </div>
          <div className="flex justify-center flex-col w-28 space-y-1">
            <span className="flex flex-col justify-center text-sm px-3 text-gray-700 border-2 rounded-lg border-transparent w-28">
              Preço
            </span>
          </div>
          {!hideActions && (
            <div className="pr-3 space-x-1 flex items-center justify-center w-20">
              <button onClick={() => console.log(`rem`)}>
                <FiEdit className="text-blue-300 hover:text-blue-400 text-[17px]" />
              </button>
              <button onClick={() => console.log(`del`)}>
                <FiTrash className="text-red-300 hover:text-red-400 text-[17px]" />
              </button>
            </div>
          )}
        </div>
      )}
      <div className="flex space-y-3 flex-col">
        {items.map((item, index) => (
          <div
            id={`item-${index}`}
            className={`w-full rounded-xl py-1 ${
              index % 2 === 0 ? `bg-gray-100` : ``
            }`}
            key={item.id}
          >
            <div className="flex flex-row space-x-2">
              <div className="flex justify-center flex-col w-28 space-y-1">
                <span className="flex items-center text-sm px-3 text-gray-700 border-2 rounded-lg h-8 border-transparent w-28">
                  {item.device.code}
                </span>
              </div>
              <div className="flex justify-center flex-col w-full space-y-1">
                <span className="flex items-center text-sm px-3 text-gray-700 border-2 rounded-lg h-8 border-transparent w-full">
                  {item.device.exhibition_description}
                </span>
              </div>
              <div className="flex justify-center flex-col w-28 space-y-1">
                <span className="flex items-center text-sm px-3 text-gray-700 border-2 rounded-lg h-8 border-transparent w-28">
                  {numberToBrazilianReal(item.device.un_price)}
                </span>
              </div>
              <div className="flex justify-center flex-col w-28 space-y-1">
                <div className="flex space-x-2 items-center justify-center text-sm px-3 text-gray-700 border-2 rounded-lg h-8 border-transparent w-28">
                  {!hideActions ? (
                    <>
                      <button onClick={() => decrease(item.device.alias)}>
                        <FiMinus className="text-red-300 text-[17px]" />
                      </button>
                      <input
                        className="w-8 bg-transparent text-center focus:outline-none"
                        value={item.quantity}
                        onKeyPress={(e) => {
                          if (!/[0-9]/.test(e.key)) {
                            e.preventDefault();
                          }
                        }}
                        onChange={(e) =>
                          change(
                            item.device.alias,
                            parseInt(e.target.value) || 0,
                          )
                        }
                        autoFocus
                      />
                      <button onClick={() => increase(item.device.alias)}>
                        <FiPlus className="text-green-300 text-[17px]" />
                      </button>
                    </>
                  ) : (
                    <span>x{item.quantity}</span>
                  )}
                </div>
              </div>
              <div className="flex justify-center flex-col w-28 space-y-1">
                <span className="flex flex-col justify-center text-sm px-3 text-gray-700 border-2 rounded-lg border-transparent w-28">
                  {numberToBrazilianReal(item.price)}
                </span>
              </div>
              {!hideActions && (
                <div className="pr-3 space-x-1 flex items-center justify-center w-20">
                  <button onClick={() => remove(item.device.alias)}>
                    <FiTrash className="text-red-300 hover:text-red-400 text-[17px]" />
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
