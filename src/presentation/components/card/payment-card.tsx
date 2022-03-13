import { RemoteOrderModel } from '@/data/models';
import {
  numberToBrazilianReal,
  utcToLocal,
} from '@/presentation/utils/formatters';
import { PriceOverallCard } from './price-overall-card';

interface Props {
  data: RemoteOrderModel;
}

export function PaymentCard({ data }: Props) {
  return (
    <>
      <div className="border-2 rounded-lg border-dotted">
        <div>
          <table className="min-w-full divide-y-2 divide-dotted text-center">
            <thead className="">
              <tr className="h-10">
                <th
                  scope="col"
                  className="w-1/6 px-3 text-lg font-medium text-gray-500"
                >
                  <div className="flex items-center justify-center">
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
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                </th>
                <th
                  scope="col"
                  className="w-1/6 px-3 text-lg font-medium text-gray-500"
                >
                  <div className="flex items-center justify-center">
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
                        d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                      />
                    </svg>
                  </div>
                </th>
                <th
                  scope="col"
                  className="w-1/6 px-3 text-lg font-medium text-gray-500"
                >
                  <div className="flex items-center justify-center">
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
                        d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                  </div>
                </th>
                <th
                  scope="col"
                  className="w-2/6 px-3 text-lg font-medium text-gray-500"
                >
                  <div className="flex items-center justify-center">
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
                        d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                      />
                    </svg>
                  </div>
                </th>

                <th
                  scope="col"
                  className="w-1/6 px-3 text-md font-medium text-gray-500"
                >
                  <div className="flex items-center justify-center">
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
                        d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                      />
                    </svg>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white text-sm">
              {data.payments.map((payment, index) => (
                <tr
                  key={payment.id}
                  className={`${
                    index % 2 === 0 ? `bg-gray-100` : `bg-white`
                  } h-10`}
                >
                  <td className="">{utcToLocal(payment.created_at)}</td>
                  <td className="">{numberToBrazilianReal(payment.amount)}</td>
                  <td className="">{payment.method}</td>
                  <td className="">{payment.identifier}</td>
                  <td className="">
                    <button
                      className="text-red-400 hover:text-red-500"
                      onClick={() => ({})}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <PriceOverallCard prices={[1, 2, 3]} type="sum" />
    </>
  );
}
