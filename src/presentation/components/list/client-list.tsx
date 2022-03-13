import { RemoteClientModel } from '@/data/models';
import {
  enumPhoneTypeToString,
  stringToBrazilianPhoneNumber,
  utcToLocal,
} from '@/presentation/utils/formatters';

interface Props {
  clients: RemoteClientModel[];
}

export function ClientList({ clients }: Props) {
  return (
    <div className="px-8">
      <table className="min-w-full text-center">
        <thead>
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-sm font-medium text-gray-500"
            >
              <input type="checkbox" />
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-sm font-medium text-gray-500"
            >
              Nome
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-sm font-medium text-gray-500"
            >
              E-mail
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-sm font-medium text-gray-500"
            >
              Tel.
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-sm font-medium text-gray-500"
            >
              Endereço
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-sm font-medium text-gray-500"
            >
              Criado em
            </th>
          </tr>
        </thead>
        <tbody className="bg-white text-sm">
          {clients?.map((client, index) => (
            <tr
              key={client.id}
              className={`rounded-xl
                    ${index % 2 === 0 ? `bg-gray-100` : `bg-white`}
                  `}
            >
              <td className="px-6 py-3 truncate">
                <input type="checkbox" />
              </td>

              <td className="px-6 py-3 truncate">{client.name}</td>
              <td className="px-6 py-3 truncate">{client.email}</td>
              <td className="px-6 py-3">
                {stringToBrazilianPhoneNumber(client.phone.number)} -{` `}
                {enumPhoneTypeToString(client.phone.type)}
              </td>
              <td className="px-6 py-3">
                {client.address.street}, {client.address.number} -{` `}
                {client.address.neighborhood} - {client.address.city} -{` `}
                {client.address.uf}
              </td>
              <td className="px-6 py-3">{utcToLocal(client.created_at)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
