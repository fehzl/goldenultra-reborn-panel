import TextInput from '@/presentation/components/text-input/text-input';

export default function NewItem() {
  return (
    <div>
      <form>
        <div className="">
          <span>.detalhes</span>
          <div className="flex flex-row">
            <TextInput label="código" />
            <TextInput label="apelido" />
            <TextInput label="descrição de exibição" />
            <TextInput label="descrição detalhada" />
            <TextInput label="grupo" />
            <TextInput label="imagens" />
          </div>
        </div>
        <div className="">
          <span>.logistica</span>
          <div className="flex flex-row">
            <TextInput label="unidade em uma caixa" />
            <TextInput label="peso" />
            <TextInput label="peso líquido" />
          </div>
        </div>
        <div className="">
          <span>.vendas</span>
          <div className="flex flex-row">
            <TextInput label="disponível para venda" />
            <TextInput label="preço da unidade" />
            <TextInput label="preço da caixa" />
          </div>
        </div>
        <button type="submit">salvar</button>
      </form>
    </div>
  );
}
