import Currency, { CurrencyInputProps } from 'react-currency-input-field';

type Props = CurrencyInputProps & {
  handleValue: (value: number | null | undefined) => void;
};

export function CurrencyInput({ handleValue, ...rest }: Props) {
  const handleOnValueChange: CurrencyInputProps['onValueChange'] = (
    _value,
    _,
    values,
  ): void => {
    handleValue(values?.float);
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
        className="w-16 bg-transparent text-center focus:outline-none"
        {...rest}
      />
    </div>
  );
}
