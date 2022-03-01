import { OrderItems } from '@/presentation/components/order';
import { useState } from 'react';
import { BiBox, BiListCheck } from 'react-icons/bi';
import { OrderItemsForm } from '@/presentation/components/forms/order-items-form/order-items-form';
import { OrderClientForm } from '@/presentation/components/forms/order-client-form/order-client-form';
import { IoMdSwap } from 'react-icons/io';
import { AiOutlineUser } from 'react-icons/ai';
import { AxiosHttpClientAdapter } from '@/infra/http/axios-http-client-adapter';
import { RemoteSaveOrder } from '@/data/usecases';
import { useRouter } from 'next/router';

export default function NewOrder() {
  const router = useRouter();
  const [items, setItems] = useState<any[]>([]);
  const [client, setClient] = useState<any>(null);

  const httpClient = new AxiosHttpClientAdapter();
  const url = `http://localhost:3333/api/v1/orders`;
  const remoteSaveOrder = new RemoteSaveOrder(url, httpClient);

  const handleSubmit = async () => {
    const order = {
      employeeId: `dcdc8d0a-7438-4d93-b969-424ab71b7133`,
      clientId: client.id,
      items: [
        ...items.map((item) => ({
          deviceId: item.device.id,
          quantity: item.quantity,
          price: item.quantity * item.device.un_price,
        })),
      ],
    };
    const response = await remoteSaveOrder.save(order);
    response.code
      ? router.push(`/painel/pedidos/p/${response.code}`)
      : alert(`Erro ao salvar pedido`);
  };

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
          <div className="flex flex-col space-y-6">
            <div className="flex flex-col space-y-2">
              <div className="flex space-x-1 flex-row items-center text-sm text-gray-600">
                <AiOutlineUser className="text-xl" />
                <span>Cliente</span>
              </div>
              <div
                className={`w-full ${
                  items.length && `space-y-5`
                } px-12 pt-4 pb-6 border-2 rounded-xl bg-gray-50 border-gray-200 border-dotted`}
              >
                {!client ? (
                  <OrderClientForm client={client} setClient={setClient} />
                ) : (
                  <div className="flex flex-row space-x-24">
                    <div className="flex flex-col space-y-2">
                      <div className="flex flex-col ">
                        <span className="text-sm text-gray-500">
                          <span className="flex flex-row items-center space-x-1">
                            <span>Cliente</span>
                            <IoMdSwap
                              onClick={() => setClient(null)}
                              className="text-xl"
                            />
                          </span>
                        </span>
                        <span className="text-gray-700">{client.name}</span>
                      </div>
                      <div className="flex flex-col ">
                        <span className="text-sm text-gray-500">CPF</span>
                        <span className="text-gray-700">{client.cpf}</span>
                      </div>
                      <div className="flex flex-col ">
                        <span className="text-sm text-gray-500">Tipo</span>
                        <span className="text-gray-700">
                          {client.person_type === `F`
                            ? `Pessoa Física`
                            : `Pessoa Jurídica`}
                        </span>
                      </div>
                      <div className="flex flex-col ">
                        <span className="text-sm text-gray-500">RG</span>
                        <span className="text-gray-700">{client.rg}</span>
                      </div>
                    </div>
                    <div className="flex flex-col space-y-2">
                      <div className="flex flex-col ">
                        <span className="text-sm text-gray-500">
                          <span className="flex flex-row items-center space-x-1">
                            <span>Endereço</span>
                          </span>
                        </span>
                        <span className="text-gray-700">
                          {client.address.address}
                        </span>
                      </div>
                      <div className="flex flex-col ">
                        <span className="text-sm text-gray-500">Cidade</span>
                        <span className="text-gray-700">
                          {client.address.city}
                        </span>
                      </div>
                      <div className="flex flex-col ">
                        <span className="text-sm text-gray-500">UF</span>
                        <span className="text-gray-700">
                          {client.address.state}
                        </span>
                      </div>
                      <div className="flex flex-col ">
                        <span className="text-sm text-gray-500">CEP</span>
                        <span className="text-gray-700">
                          {client.address.zipcode}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col space-y-2">
                      <div className="flex flex-col ">
                        <span className="text-sm text-gray-500">
                          <span className="flex flex-row items-center space-x-1">
                            <span>Tel.:</span>
                          </span>
                        </span>
                        <span className="text-gray-700">
                          {client.phone.phone}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="flex flex-col space-y-2">
              <div className="flex space-x-1 flex-row items-center text-sm text-gray-600">
                <BiListCheck className="text-2xl" />
                <span>Itens</span>
              </div>
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
          <button
            onClick={() => handleSubmit()}
            className="w-full bg-green-500 text-white text-sm font-bold py-2 px-4 rounded-xl"
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
}
