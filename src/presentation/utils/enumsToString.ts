export function orderPaymentEnumToString(enumName: string): string {
  switch (enumName) {
    case `PAID`:
      return `Pago`;
    case `PAID_PARTIAL`:
      return `Pago Parcial`;
    case `PENDING`:
      return `Pendente`;
    case `CANCELED`:
      return `Cancelado`;
    default:
      return `Desconhecido`;
  }
}

export function orderPaymentMethodeEnumToString(enumName: string): string {
  switch (enumName) {
    case `PIX`:
      return `PIX`;
    case `TED`:
      return `TED`;
    case `DOC`:
      return `DOC`;
    case `TICKET`:
      return `Boleto`;
    case `CREDIT_CARD`:
      return `Cartão de Crédito`;
    case `DEBIT_CARD`:
      return `Cartão de débito`;
    case `CASH`:
      return `Dinheiro`;
    case `OTHER`:
      return `Outros`;
    default:
      return `Desconhecido`;
  }
}

export function orderChargeTypeToString(enumName: string): string {
  switch (enumName) {
    case `TAX_REPLACEMENT`:
      return `Substituição Tributária`;
    case `FREIGHT`:
      return `Frete`;
    case `OTHER`:
      return `Outros`;
    default:
      return `Desconhecido`;
  }
}
