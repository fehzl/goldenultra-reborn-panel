import { useRef, useState } from 'react';
import { AxiosHttpClientAdapter } from '@/infra/http/axios-http-client-adapter';
import { RemoteSaveOrder } from '@/data/usecases';
import { useRouter } from 'next/router';
import { PageHeader, PageWrapper } from '@/presentation/components/shared/';
import { stringOrNumberToDottedFloat } from '@/presentation/utils/formatters';
import {
  OrderClientCard,
  OrderClientDataEntry,
  OrderItemList,
  OrderItemDataEntry,
} from '@/presentation/components/order';

export default function NewOrder() {
  const router = useRouter();
  const [items, setItems] = useState<any[]>([]);
  const [client, setClient] = useState<any>(null);

  const sections = [{ name: `Detalhes`, activeColor: `text-green-500` }];
  const [activeSection, setActiveSection] = useState<string>(sections[0].name);

  const httpClient = new AxiosHttpClientAdapter();
  const url = `http://132.226.243.30:3333/api/v1/orders`;
  const remoteSaveOrder = new RemoteSaveOrder(url, httpClient);

  const handleSubmit = async () => {
    const order = {
      employeeId: `dcdc8d0a-7438-4d93-b969-424ab71b7133`,
      clientId: client.id,
      items: [
        ...items.map((item) => ({
          deviceId: item.device.id,
          devicePrice: stringOrNumberToDottedFloat(item.device_price),
          quantity: item.quantity,
          price: item.quantity * stringOrNumberToDottedFloat(item.device_price),
        })),
      ],
    };
    const response = await remoteSaveOrder.save(order);
    response.code
      ? router.push(`/painel/pedidos/p/${response.code}`)
      : alert(`Erro ao salvar pedido`);
  };

  const selectItemsRef = useRef<any>();

  const increaseQuantity = (alias: string): void => {
    const item = items.find((item) => item.device.alias === alias);
    if (item) {
      item.quantity += 1;
      item.price = item.quantity * item.device_price;
      setItems([...items]);
    }
  };

  const decreaseQuantity = (alias: string): void => {
    const item = items.find((item) => item.device.alias === alias);
    if (item) {
      if (item.quantity > 1) {
        item.quantity -= 1;
        item.price = item.quantity * item.device_price;
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
      item.price = item.quantity * item.device_price;

      setItems([...items]);
    }
  };

  const changePrice = (
    alias: string,
    price: string | number | undefined,
    originalPrice: string,
  ): void => {
    const item = items.find((item) => item.device.alias === alias);
    if (price === NaN) {
      return;
    }

    if (item) {
      if (!item.device.original_price) {
        item.device.original_price = parseFloat(originalPrice).toFixed(2);
      }
      item.device_price = price;
      item.device.manual_price = true;
      setItems([...items]);
    }
  };

  const setItemPriceToOriginal = (alias: string): void => {
    const item = items.find((item) => item.device.alias === alias);
    if (item) {
      item.device_price = parseFloat(item.device.un_price).toFixed(2);
      item.device.manual_price = false;
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
    <>
      <PageHeader
        type="title-subtitle"
        titleIcon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
            />
          </svg>
        }
        titleText="Novo Pedido"
      />
      <PageWrapper
        sections={sections}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      >
        <div className="flex flex-col px-8 space-y-8">
          <div className="flex flex-col space-y-3">
            {!client ? (
              <OrderClientDataEntry client={client} setClient={setClient} />
            ) : (
              <OrderClientCard client={client} />
            )}
          </div>
          <div className="flex flex-col space-y-6">
            <OrderItemDataEntry
              items={items}
              setItems={setItems}
              selectInputRef={selectItemsRef}
            />
            {items.length > 0 && (
              <OrderItemList
                items={items}
                showActions
                increaseQuantity={increaseQuantity}
                decreaseQuantity={decreaseQuantity}
                changeQuantity={changeQuantity}
                changePrice={changePrice}
                removeItem={removeItem}
                setItemPriceToOriginal={setItemPriceToOriginal}
                selectInputRef={selectItemsRef}
              />
            )}
          </div>
          <div className="flex space-x-2 justify-end">
            <button
              onClick={() => router.back()}
              className="flex flex-row text-sm items-center justify-around px-2 py-1 transition-all ease-in duration-100 rounded-lg text-white font-bold h-10 w-10 bg-red-400 hover:bg-red-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <button
              onClick={() => handleSubmit()}
              className="flex flex-row text-sm items-center justify-around px-2 py-1 transition-all ease-in duration-100 rounded-lg text-white font-bold h-10 w-10 bg-green-400 hover:bg-green-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </button>
          </div>
        </div>
      </PageWrapper>
    </>
  );
}
