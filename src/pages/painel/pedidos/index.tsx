import Link from 'next/link';

export default function Orders() {
  return (
    <div>
      <Link href="/painel/pedidos/novo-pedido" passHref>
        <div>novo pedido</div>
      </Link>
    </div>
  );
}
