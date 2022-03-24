import React from 'react';
import { FieldError } from 'react-hook-form';

type InputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  label?: React.ReactNode;
  error?: FieldError;
};

export const TextInput = React.forwardRef<HTMLInputElement, InputProps>(
  function Input({ label, error = undefined, ...rest }: InputProps, ref) {
    return (
      <div className="flex flex-col">
        {label && (
          <label htmlFor="code" className="text-sm text-gray-500">
            {label}
          </label>
        )}
        <input
          className={`border-2 rounded-lg text-gray-800 h-10 px-2 py-1 focus:outline-none ${
            !error ? `border-gray-200` : `border-red-200`
          }`}
          autoComplete="off"
          ref={ref}
          {...rest}
        />
        {error && <small className="text-red-400">{error.message}</small>}
      </div>
    );
  },
);
