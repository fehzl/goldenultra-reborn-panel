import { RemoteOrderItemModel } from '@/data/models';
import {
  numberToBrazilianReal,
  stringOrNumberToDottedFloat,
  toTitleCase,
} from '@/presentation/utils/formatters';
import { useState } from 'react';
import { CurrencyInput } from '../input/currency-input/currrency-input';

interface Props {
  items: RemoteOrderItemModel[];
  showActions?: boolean;
  increaseQuantity?: (alias: string) => void;
  decreaseQuantity?: (alias: string) => void;
  changeQuantity?: (alias: string, quantity: number) => void;
  changePrice?: (
    alias: string,
    price: number | null | undefined,
    originalPrice: string,
  ) => void;
  removeItem?: (alias: string) => void;
  setItemPriceToOriginal?: (alias: string) => void;
  selectInputRef?: React.RefObject<any>;
}

export function OrderItemList({
  items = [],
  showActions = false,
  increaseQuantity = () => ({}),
  decreaseQuantity = () => ({}),
  changeQuantity = () => ({}),
  changePrice = () => ({}),
  removeItem = () => ({}),
  setItemPriceToOriginal = () => ({}),
  selectInputRef,
}: Props) {
  const [isDefaultPrice, setIsDefaultPrice] = useState(true);
  return (
    <div>
      {!showActions && (
        <div className="pb-4 text-gray-600">
          <span>Itens do Pedido</span>
        </div>
      )}
      <div className="border-2 rounded-lg border-dotted">
        <div>
          <table className="min-w-full divide-y-2 divide-dotted text-center">
            <thead className="">
              <tr>
                <th
                  scope="col"
                  className="h-12 w-1/12 px-3 text-lg font-medium text-gray-500"
                >
                  <div className="flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 22 22"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                      />
                    </svg>
                  </div>
                </th>
                <th
                  scope="col"
                  className="w-4/12 px-3 text-lg font-medium text-gray-500"
                >
                  <div className="flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 22 22"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4"
                      />
                    </svg>
                  </div>
                </th>
                <th
                  scope="col"
                  className="w-2/12 px-3 text-lg font-medium text-gray-500"
                >
                  <div className="flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 22 22"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                  </div>
                </th>
                <th
                  scope="col"
                  className="w-2/12 px-3 text-lg font-medium text-gray-500"
                >
                  <div className="flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 22 22"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                </th>
                <th
                  scope="col"
                  className="w-2/12 px-3 text-lg font-medium text-gray-500"
                >
                  <div className="flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 22 22"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2zM10 8.5a.5.5 0 11-1 0 .5.5 0 011 0zm5 5a.5.5 0 11-1 0 .5.5 0 011 0z"
                      />
                    </svg>
                  </div>
                </th>
                {showActions && (
                  <th
                    scope="col"
                    className="w-1/12 px-3 text-md font-medium text-gray-500"
                  >
                    <div className="flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 22 22"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                        />
                      </svg>
                    </div>
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="bg-white text-sm">
              {items?.map((item, index) => (
                <tr
                  key={item.id}
                  className={`${
                    index % 2 === 0 ? `bg-gray-100` : `bg-white`
                  } h-10`}
                >
                  <td className="truncate px-3">
                    {item.device.code.toUpperCase()}
                  </td>
                  <td className="truncate px-3">
                    {toTitleCase(item.device.exhibition_description)}
                  </td>
                  <td className="truncate px-3">
                    <div className="flex flex-row space-x-2 justify-center items-center">
                      {showActions ? (
                        <>
                          {isDefaultPrice ? (
                            <>
                              <span className="w-16">
                                {numberToBrazilianReal(item.price)}
                              </span>
                              <button onClick={() => setIsDefaultPrice(false)}>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-4 w-4 text-blue-400"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                  strokeWidth={2}
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                  />
                                </svg>
                              </button>
                            </>
                          ) : (
                            <>
                              <CurrencyInput
                                defaultValue={item.price}
                                handleValue={(
                                  value: number | null | undefined,
                                ) => {
                                  changePrice(item.device.alias, value, `1`);
                                }}
                              />
                              <button
                                onClick={() => {
                                  setIsDefaultPrice(true);
                                  setItemPriceToOriginal(item.device.alias);
                                }}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-4 w-4 text-blue-400"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                  strokeWidth={2}
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                                  />
                                </svg>
                              </button>
                            </>
                          )}
                        </>
                      ) : (
                        <>{numberToBrazilianReal(item.price)}</>
                      )}
                    </div>
                  </td>
                  <td className="py-2 px-3">
                    <div className="flex flex-row justify-center">
                      <button
                        className={`${showActions ? `` : `hidden`}`}
                        onClick={() => decreaseQuantity(item.device.alias)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 text-red-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M20 12H4"
                          />
                        </svg>
                      </button>
                      {showActions ? (
                        <input
                          className="w-14 bg-transparent text-center focus:outline-none"
                          value={item.amount}
                          onKeyPress={(e) => {
                            if (!/[0-9]/.test(e.key)) {
                              e.preventDefault();
                            }
                            selectInputRef?.current.focus();
                          }}
                          maxLength={3}
                          onChange={(e) =>
                            changeQuantity(
                              item.device.alias,
                              parseInt(e.target.value) || 0,
                            )
                          }
                          autoFocus
                        />
                      ) : (
                        <>{item.amount}</>
                      )}
                      <button
                        className={`${showActions ? `` : `hidden`}`}
                        onClick={() => increaseQuantity(item.device.alias)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 text-green-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 4v16m8-8H4"
                          />
                        </svg>
                      </button>
                    </div>
                  </td>
                  <td className="py-2 px-3">
                    {numberToBrazilianReal(
                      item.amount * stringOrNumberToDottedFloat(item.price),
                    )}
                  </td>
                  {showActions && (
                    <td className="py-2 px-3">
                      <button
                        className="text-red-400 hover:text-red-500"
                        onClick={() => removeItem(item.device.alias)}
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
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
