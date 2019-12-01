// Basic currency format
// Can be replace by any external library when needed

const regex = /\d(?=(\d{3})+\.)/g;

const currencyFormat = {
  usd: value => `$${value} USD`,
};

const formatCurrency = (value, code) => {
  const formatter = currencyFormat[code];

  return formatter ? formatter(value) : value;
};

export function FormattedNumber({ value = 0, decimal = 2, currency, fixedDecimal }) {
  let formattedValue = value.toFixed(decimal).replace(regex, '$&,')
   
  if (!currency) {
    formattedValue = formattedValue.replace(/\.0+/, '');
  }

  if (currency) {
    return formatCurrency(formattedValue, currency);
  }

  return formattedValue;
}
