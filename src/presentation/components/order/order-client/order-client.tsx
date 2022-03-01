import { RemoteClientModel } from '@/data/models';

interface OrderClientDetailsProps {
  client: RemoteClientModel;
}

export function OrderClient({ client }: OrderClientDetailsProps) {
  return (
    <div className="px-12 py-4 border-2 rounded-xl bg-gray-50 border-gray-200 border-dotted">
      <div className="flex flex-row w-full space-x-24">
        <div className="flex flex-col space-y-2">
          <div className="flex flex-row space-x-2">
            <span>Nome:</span>
            <span>{client.name}</span>
          </div>
          <div className="flex flex-row space-x-2">
            <span>RG:</span>
            <span>{client.rg}</span>
          </div>
          <div className="flex flex-row space-x-2">
            <span>CPF:</span>
            <span>{client.cpf}</span>
          </div>
          <div className="flex flex-row space-x-2">
            <span>Tipo:</span>
            <span>
              Pessoa{` `}
              {client.person_type === `F` ? `Física` : `Jurídica`}
            </span>
          </div>
        </div>
        <div className="flex flex-col space-y-2">
          <div className="flex flex-row space-x-2">
            <span>Endereço:</span>
            <span>{client.address.address}</span>
          </div>
          <div className="flex flex-row space-x-2">
            <span>UF:</span>
            <span>{client.address.state}</span>
          </div>
          <div className="flex flex-row space-x-2">
            <span>Cidade:</span>
            <span>{client.address.city}</span>
          </div>
          <div className="flex flex-row space-x-2">
            <span>CEP:</span>
            <span>{client.address.zipcode}</span>
          </div>
        </div>
        <div className="flex flex-col space-y-2">
          <div className="flex flex-row space-x-2">
            <span>Tel.:</span>
            <span>{client.phone.phone}</span>
          </div>
          <div className="flex flex-row space-x-2">
            <span>Tipo:</span>
            <span>{client.phone.phone_type}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
