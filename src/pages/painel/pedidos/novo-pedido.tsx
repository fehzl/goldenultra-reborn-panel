import TextInput from '@/components/text-input/text-input';

export default function NewOrder() {
  return (
    <div>
      <div>
        <TextInput label="código" />
      </div>
      <div>
        <TextInput label="cliente" />
      </div>
    </div>
  );
}
