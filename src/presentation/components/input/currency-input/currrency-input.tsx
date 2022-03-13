import Currency, { CurrencyInputProps } from 'react-currency-input-field';

type Props = CurrencyInputProps & {
  handleValue: (value: number | null | undefined) => void;
  type: 'form' | 'table';
};

export function CurrencyInput({ handleValue, type, ...rest }: Props) {
  const handleOnValueChange: CurrencyInputProps['onValueChange'] = (
    _value,
    _,
    values,
  ): void => {
    handleValue(values?.float);
  };

  const handleClassName = () => {
    switch (type) {
      case `form`:
        return `border-2 rounded-lg text-gray-800 h-10 px-2 py-1 focus:outline-none border-gray-200`;
      case `table`:
        return `w-16 bg-transparent text-center focus:outline-none`;
      default:
        return `border-2 rounded-lg text-gray-800 h-10 px-2 py-1 focus:outline-none border-gray-200`;
    }
  };

  return (
    <div>
      <Currency
        onValueChange={handleOnValueChange}
        groupSeparator="."
        decimalSeparator=","
        decimalScale={2}
        prefix="R$ "
        decimalsLimit={2}
        className={handleClassName()}
        {...rest}
      />
    </div>
  );
}
