import React from 'react';
import Currency, { CurrencyInputProps } from 'react-currency-input-field';
import { FieldError } from 'react-hook-form';

type Props = CurrencyInputProps & {
  handleValue: (value: number | null | undefined) => void;
  type: 'form' | 'table';
  label?: string;
  error?: FieldError;
};

export const CurrencyInput = React.forwardRef<HTMLInputElement, Props>(
  function CurrencyInput(
    { handleValue, type, label, error = undefined, ...rest }: Props,
    ref,
  ) {
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
      <div className="flex flex-col">
        {label && (
          <label htmlFor="code" className="text-sm text-gray-500">
            {label}
          </label>
        )}
        <Currency
          onValueChange={handleOnValueChange}
          groupSeparator="."
          decimalSeparator=","
          decimalScale={2}
          prefix="R$ "
          decimalsLimit={2}
          className={handleClassName()}
          {...rest}
          autoComplete="off"
          ref={ref}
        />
        {error && <small className="text-red-400">{error.message}</small>}
      </div>
    );
  },
);
