import { numberToBrazilianReal } from '@/presentation/utils/formatters';

interface Props {
  prices: number[];
  type: 'overall' | 'sum' | 'minus';
}

export function PriceOverallCard({ prices, type }: Props) {
  const renderTypeClass = () => {
    const common = `font-bold text-sm flex flex-row items-center w-32 justify-center`;

    switch (type) {
      case `overall`:
        return `text-gray-500 ${common}`;
      case `sum`:
        return `text-green-500 ${common}`;
      case `minus`:
        return `text-red-500 ${common}`;
      default:
        return `text-gray-500 ${common}`;
    }
  };

  return (
    <div className="bg-white h-24 border-2 border-dotted divide-x-2 rounded-lg flex flex-row px-4 py-4 items-center justify-center">
      {prices.map((price, index) => (
        <div key={index} className={renderTypeClass()}>
          <span>{numberToBrazilianReal(price)}</span>
        </div>
      ))}
    </div>
  );
}
