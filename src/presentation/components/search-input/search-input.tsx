import { FieldError } from 'react-hook-form';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: FieldError;
  options: any;
}

export function SearchInput({
  label,
  options = [1, 2, 3],
  error = null,
}: Props) {
  return (
    <form className="w-full">
      <div className="flex flex-row">
        <div className="flex relative flex-col w-full space-y-1">
          <label htmlFor="code" className="text-sm text-gray-500">
            Pesquisar
          </label>
          <input
            autoComplete="off"
            className={`text-sm px-3 text-gray-700 h-8 border-gray-200 border-2 rounded-lg w-full focus:outline-none`}
          />
          <div className="search-input__results">
            {options.map((option: any) => (
              <div className="search-input__result" key={option.id}>
                {option.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </form>
  );
}
