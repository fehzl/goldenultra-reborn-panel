import React from 'react';

type InputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  label?: React.ReactNode;
  error?: string;
};

export const TextInput = React.forwardRef<HTMLInputElement, InputProps>(
  function Input({ label, error, ...rest }: InputProps, ref) {
    return (
      <div className="flex flex-col">
        {label && (
          <label htmlFor="code" className="text-sm text-gray-500">
            {label}
          </label>
        )}
        <input
          className={`border-2 rounded-lg text-gray-800 px-2 py-1 focus:outline-none ${
            !error ? `border-gray-200` : `border-red-200`
          }`}
          autoComplete="off"
          ref={ref}
          {...rest}
        />
        <small className="text-red-400">{error}</small>
      </div>
    );
  },
);
