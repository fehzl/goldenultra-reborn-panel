import { FieldError } from 'react-hook-form';

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: FieldError;
}

export default function TextInput({ label, error }: TextInputProps) {
  return (
    <div className="mb-4 flex flex-col">
      <label htmlFor="email" className="text-sm text-gray-700">
        {label}
      </label>
      <input
        className="bg-gray-200 text-gray-800 my-2 px-3 py-1 text-sm rounded-lg h-8"
        type="text"
      />
      {error && (
        <div className="text-red-500 text-xs mt-1">{error.message}</div>
      )}
    </div>
  );
}
