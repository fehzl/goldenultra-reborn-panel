import { OrderItems } from '@/components/order';
import { useState } from 'react';
import { BiBox } from 'react-icons/bi';
import { OrderItemsForm } from '@/components/forms/order-items-form/order-items-form';

export default function NewOrder() {
  const [items, setItems] = useState<any[]>([]);

  const increaseQuantity = (alias: string): void => {
    const item = items.find((item) => item.device.alias === alias);
    if (item) {
      item.quantity += 1;
      item.price = item.quantity * item.device.un_price;
      setItems([...items]);
    }
  };

  const decreaseQuantity = (alias: string): void => {
    const item = items.find((item) => item.device.alias === alias);
    if (item) {
      if (item.quantity > 1) {
        item.quantity -= 1;
        item.price = item.quantity * item.device.un_price;
        setItems([...items]);
      }
    }
  };

  const changeQuantity = (alias: string, quantity: number): void => {
    const item = items.find((item) => item.device.alias === alias);
    if (quantity === NaN) {
      return;
    }
    if (item) {
      item.quantity = quantity;
      item.price = item.quantity * item.device.un_price;

      setItems([...items]);
    }
  };

  const removeItem = (alias: string): void => {
    const item = items.find((item) => item.device.alias === alias);
    if (item) {
      setItems(items.filter((item) => item.device.alias !== alias));
    }
  };

  return (
    <div className="px-12">
      <div className="flex pt-4 pb-8 flex-row justify-between items-center">
        <div className="flex space-x-2 items-center flex-row text-gray-500">
          <BiBox className="text-2xl" />
          <span className="text-md">Novo Pedido</span>
        </div>
      </div>
      <div className="rounded-xl border-2 border-gray-200 bg-white">
        <div className="px-12 flex flex-row h-20 items-center justify-between rounded-t-xl border-b-2 border-gray-200">
          <div className="flex flex-row items-center space-x-4 h-full">
            <div className="cursor-pointer text-sm font-normal text-green-500">
              <button>Detalhes</button>
            </div>
            <div className="cursor-pointer text-sm font-normal text-gray-500">
              <button>Pagamento</button>
            </div>
            <div className="cursor-pointer text-sm font-normal text-gray-500">
              <button>Separação</button>
            </div>
            <div className="cursor-pointer text-sm font-normal text-gray-500">
              <button>Histórico</button>
            </div>
          </div>
          <div className="flex flex-row space-x-6"></div>
        </div>

        <div className="transition-transform duration-150 ease-in px-12 py-12 space-y-12">
          <div className="flex flex-row">
            <div
              className={`w-full ${
                items.length && `space-y-5`
              } px-12 pt-4 pb-6 border-2 rounded-xl bg-gray-50 border-gray-200 border-dotted`}
            >
              <OrderItemsForm items={items} setItems={setItems} />
              <OrderItems
                items={items}
                hideHeader
                decrease={decreaseQuantity}
                increase={increaseQuantity}
                change={changeQuantity}
                remove={removeItem}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
