import { DEFAULT_CURRENCY } from "./constants";

const THOUSANDS_SEPARATOR = " ";

export const formatMoney = (amount: number, currency = DEFAULT_CURRENCY) => {
  const rounded = Math.round(Math.abs(amount));
  const grouped = String(rounded).replace(
    /\B(?=(\d{3})+(?!\d))/g,
    THOUSANDS_SEPARATOR
  );
  const sign = amount < 0 ? "-" : "";

  return `${sign}${grouped}${THOUSANDS_SEPARATOR}${currency}`;
};
