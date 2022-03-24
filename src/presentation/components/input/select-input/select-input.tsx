import React from 'react';
import { FieldError, UseFormSetValue } from 'react-hook-form';
import Select, { Props as ReactSelectProps } from 'react-select';

type SelectInputProps = ReactSelectProps & {
  label?: React.ReactNode;
  error?: FieldError;
  setValue: UseFormSetValue<any>;
  value: string;
};

export const SelectInput = React.forwardRef<
  HTMLSelectElement,
  SelectInputProps
>(function SelectInput(
  {
    name = ``,
    label,
    error = undefined,
    isSearchable = false,
    options = [],
    setValue,
    value,
  },
  ref: React.Ref<any> | undefined,
) {
  return (
    <div className="flex flex-col">
      {label && (
        <label htmlFor="code" className="text-sm text-gray-500">
          {label}
        </label>
      )}
      <Select
        isSearchable={isSearchable}
        styles={{
          control: (base: any, state) => ({
            ...base,
            borderRadius: state.menuIsOpen ? `8px 8px 0 0` : `8px`,
            borderColor: error
              ? `rgb(254 202 202 / var(--tw-border-opacity))`
              : `rgb(229 231 235 / var(--tw-border-opacity))`,
            borderWidth: `2px`,
            outline: `none`,
            boxShadow: `none`,
            minHeight: `36px`,
            boxSizing: `border-box`,
            ':hover': {
              borderColor: `rgb(229 231 235 / var(--tw-border-opacity))`,
            },
          }),
          option: (base: any) => ({
            ...base,
            padding: `0 0.6rem`,
            color: `rgb(51 51 51 / var(--tw-text-opacity))`,
          }),
          valueContainer: (base: any) => ({
            ...base,
          }),
          menu: (base: any) => ({
            ...base,
            marginTop: `-0.2rem`,
            zIndex: 9999,
            borderTopLeftRadius: `0`,
            borderTopRightRadius: `0`,
            borderBottomRightRadius: `0.5rem`,
            borderBottomLeftRadius: `0.5rem`,
            borderWidth: `2px`,
            borderBottomColor: `rgb(229 231 235 / var(--tw-border-opacity))`,
            boxShadow: `none`,
          }),
        }}
        options={options}
        name={name}
        className=""
        placeholder="Selecione"
        onChange={(option: any) => setValue(name, option.value)}
        value={options.find((o: any) => o.value === value)}
        ref={ref}
      />
      {error && <small className="text-red-400">{error.message}</small>}
    </div>
  );
});
