// Basic currency format
// Can be replace by any external library when needed
import BN from 'bignumber.js';
const regex = /\d(?=(\d{3})+\.)/g;

const currencyFormat = {
  usd: value => `$${value} USD`,
};

const genericFormat = (value, code) => code ? `${value} ${code.toUpperCase()}` : value;

const formatCurrency = (value, code) => {
  const formatter = currencyFormat[code];

  return formatter ? formatter(value) : genericFormat(value, code);
};

export function FormattedNumber({ value = 0, decimal = 2, currency, fixedDecimal, cleanEmptyDecimals }) {
  let formattedValue = parseFloat(value || 0);

  if (currency === 'usd' && value < 0.01 && value > 0) {
    decimal = 8;    
  }

  if (formattedValue == NaN) {
    formattedValue = 0;
  }

  if (typeof formattedValue === 'number') {
    formattedValue = new BN(formattedValue).toFixed(decimal);
  }
  
  formattedValue = formattedValue.replace(regex, '$&,')
   
  if (!currency || cleanEmptyDecimals) {
    formattedValue = formattedValue.replace(/\.0+$/, '');
  }

  if ((/\./).test(formattedValue) && !(/\.00$/).test(formattedValue)){
    formattedValue = formattedValue.replace(/00+$/, '')
  }

  if ((/\.$/).test(formattedValue)) {
    formattedValue = formattedValue.replace(/\./, '');
  }

  if (currency) {
    return formatCurrency(formattedValue, currency);
  }

  return formattedValue;
}
