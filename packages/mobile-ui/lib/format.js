// Basic currency format
// Can be replace by any external library when needed

const regex = /\d(?=(\d{3})+\.)/g;

const currencyFormat = {
  usd: value => `$${value} USD`,
};

const genericFormat = (value, code) => code ? `${value} ${code.toUpperCase()}` : value;

const formatCurrency = (value, code) => {
  const formatter = currencyFormat[code];

  return formatter ? formatter(value) : genericFormat(value, code);
};

export function FormattedNumber({ value = 0, decimal = 2, currency, fixedDecimal }) {
  let formattedValue = value || 0;
  
  if (typeof formattedValue === 'number') {
    formattedValue = formattedValue.toFixed(decimal);
  }
  
  formattedValue = formattedValue.replace(regex, '$&,')
   
  if (!currency) {
    formattedValue = formattedValue.replace(/\.0+$/, '');
  }

  if (!(/\.00$/).test(formattedValue)){
    formattedValue = formattedValue.replace(/00+$/, '')
  }

  if (currency) {
    return formatCurrency(formattedValue, currency);
  }

  return formattedValue;
}
