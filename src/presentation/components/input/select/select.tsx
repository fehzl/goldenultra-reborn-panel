import { forwardRef, ForwardRefRenderFunction, ReactElement } from 'react';
import ReactSelect, { Props as ReactSelectProps } from 'react-select';

interface Props extends ReactSelectProps<any> {
  data: any[];
  label?: string;
  optionLabel: string[];
  search: string;
  setSearch: (search: string) => void;
  chooseItem: (item: any) => void;
}

const Select: ForwardRefRenderFunction<any, Props> = (
  {
    data = [],
    label,
    chooseItem,
    search,
    setSearch,
    optionLabel = [`id`],
  }: Props,
  ref: any,
): ReactElement => {
  const onClear = (): void => {
    ref?.current.clearValue();
  };

  return (
    <div className="flex flex-row">
      <div className="flex relative rounded-lg flex-col w-full space-y-1">
        {label && (
          <label htmlFor="code" className="text-sm text-gray-500">
            {label}
          </label>
        )}
        <ReactSelect
          styles={{
            control: (base: any, state) => ({
              ...base,
              borderRadius: state.menuIsOpen ? `8px 8px 0 0` : `8px`,
              borderColor: `rgb(229 231 235 / var(--tw-border-opacity))`,
              borderWidth: `2px`,
              outline: `none`,
              boxShadow: `none`,
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
          onFocus={(e) => e.target.select()}
          options={data?.map((option) => ({
            value: option,
            label: `${option[optionLabel[0]]} - ${option[optionLabel[1]]}`,
          }))}
          placeholder="Pesquisar"
          noOptionsMessage={() => `Nenhum item encontrado`}
          isClearable
          ref={ref}
          isSearchable
          onChange={(value) => {
            if (value) {
              chooseItem(value.value);
            }
          }}
          onInputChange={(value) => {
            setSearch(value);
          }}
          inputValue={search}
          onBlur={onClear}
        />
      </div>
    </div>
  );
};

export default forwardRef(Select);
