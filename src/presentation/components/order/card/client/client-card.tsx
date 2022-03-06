import { RemoteClientModel } from '@/data/models';

interface Props {
  client: RemoteClientModel;
}

export function OrderClientCard({ client }: Props) {
  return (
    <div>
      <div className="pb-4 text-gray-600">
        <span>Detalhes do Cliente</span>
      </div>
      <div className="flex flex-row space-x-24 text-sm">
        <div className="flex flex-col space-y-2 w-1/3">
          <div className="flex flex-row space-x-1">
            <span className="text-gray-600">Nome:</span>
            <span className="text-gray-500">{client.name}</span>
          </div>
          <div className="flex flex-row space-x-1">
            <span className="text-gray-600">CPF:</span>
            <span className="text-gray-500">{client.cpf}</span>
          </div>
          <div className="flex flex-row space-x-1">
            <span className="text-gray-600">RG:</span>
            <span className="text-gray-500">{client.rg}</span>
          </div>
          <div className="flex flex-row space-x-1">
            <span className="text-gray-600">Tipo:</span>
            <span className="text-gray-500">
              Pessoa {client.person_type === `F` ? `Física` : `Jurídica`}
            </span>
          </div>
        </div>
        <div className="flex flex-col space-y-2 w-1/3">
          <div className="flex flex-row space-x-1">
            <span className="text-gray-600">Endereço:</span>
            <span className="text-gray-500">{client.address.address}</span>
          </div>
          <div className="flex flex-row space-x-1">
            <span className="text-gray-600">Cidade:</span>
            <span className="text-gray-500">{client.address.city}</span>
          </div>
          <div className="flex flex-row space-x-1">
            <span className="text-gray-600">UF:</span>
            <span className="text-gray-500">{client.address.state}</span>
          </div>
          <div className="flex flex-row space-x-1">
            <span className="text-gray-600">CEP:</span>
            <span className="text-gray-500">{client.address.zipcode}</span>
          </div>
        </div>
        <div className="flex flex-col space-y-2 w-1/3">
          <div className="flex flex-row space-x-1">
            <span className="text-gray-600">Tel.:</span>
            <span className="text-gray-500">{client.phone.phone}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
