export function numberToBrazilianReal(value: number | undefined): string {
  if (!value) return `R$ 0,00`;

  return value.toLocaleString(`pt-BR`, {
    style: `currency`,
    currency: `BRL`,
  });
}

export function numberToBrazilianWeight(value: number | undefined): string {
  if (!value) return `0,00 kg`;

  return value.toLocaleString(`pt-BR`, {
    style: `currency`,
    currency: `KG`,
  });
}

export function numberToBrazilianUnit(value: number | undefined): string {
  if (!value) return `0 unidades`;

  return value.toLocaleString(`pt-BR`, {
    style: `decimal`,
    minimumFractionDigits: 0,
  });
}

export function enumStatusToString(status: string | undefined): string {
  switch (status) {
    case `new`:
      return `Novo`;
    case `paid`:
      return `Pago`;
    case `in_separation`:
      return `Separação`;
    case `on_expedition`:
      return `Em expedição`;
    case `finished`:
      return `Finalizado`;
    case `canceled`:
      return `Cancelado`;
    default:
      return `Não definido`;
  }
}

export function utcToLocal(date: Date | string): string {
  if (!date) return ``;
  const utcDate = new Date(date);
  const localDate = new Date(
    utcDate.getTime() + utcDate.getTimezoneOffset() * 60000,
  );

  return localDate.toLocaleString(`pt-BR`, {
    timeZone: `America/Sao_Paulo`,
    year: `2-digit`,
    month: `2-digit`,
    day: `2-digit`,
    hour: `2-digit`,
    minute: `2-digit`,
  });
}

export function toTitleCase(str: string): string {
  return str.replace(
    /\w\S*/g,
    (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(),
  );
}

export function stringOrNumberToDottedFloat(value: string | number): number {
  if (typeof value === `string`) {
    return parseFloat(value.replace(/,/g, `.`));
  }

  return value;
}
