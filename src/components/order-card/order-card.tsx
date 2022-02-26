import { numberToBrazilianReal } from '@/utils/formatters';

export default function OrderCard({ order }: any) {
  return (
    <div>
      <div>{order.code}</div>
      <div>cliente: {order.client.email}</div>
      <div>por: {order.employee.email}</div>
      <div>em: {order.created_at}</div>
      <div>{order.orderItems.length} items</div>
      <div>{numberToBrazilianReal(order.total_price)}</div>
    </div>
  );
}
