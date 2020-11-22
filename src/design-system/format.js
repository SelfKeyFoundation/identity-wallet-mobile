// Basic currency format
// Can be replace by any external library when needed
import BN from 'bignumber.js';
import { getTokenAmount, getUsdPrice } from 'blockchain/services/price-service';
const regex = /\d(?=(\d{3})+\.)/g;

const currencyFormat = {
	usd: value => `$${value} USD`,
};

const genericFormat = (value, code) => (code ? `${value} ${code.toUpperCase()}` : value);

const formatCurrency = (value, code) => {
	const formatter = currencyFormat[code];

	return formatter ? formatter(value) : genericFormat(value, code);
};

export function FormattedNumber({
	value = 0,
	decimal,
	currency,
	fixedDecimal,
	cleanEmptyDecimals,
	digitLimit,
	convertFromUsd,
	convertFromToken,
}) {
	let formattedValue = parseFloat(value || 0);

	if (convertFromUsd) {
		formattedValue = getTokenAmount(formattedValue, currency);
	}

	if (convertFromToken) {
		formattedValue = getUsdPrice(formattedValue, convertFromToken);
	}

	if (!decimal && currency === 'usd' && value < 0.01 && value > 0) {
		decimal = 8;
	} else if (!decimal) {
		decimal = 2;
	}

	if (digitLimit) {
		let v = parseInt(formattedValue).toFixed(0);

		if (v.length + decimal > digitLimit) {
			decimal = digitLimit - v.length;
		}
	}

	if (formattedValue == NaN) {
		formattedValue = 0;
	}

	if (typeof formattedValue === 'number') {
		formattedValue = new BN(formattedValue).toFixed(decimal);
	}

	formattedValue = formattedValue.replace(regex, '$&,');

	if (!currency || cleanEmptyDecimals) {
		formattedValue = formattedValue.replace(/\.0+$/, '');
	}

	if (/\./.test(formattedValue) && !/\.00$/.test(formattedValue)) {
		formattedValue = formattedValue.replace(/00+$/, '');
	}

	if (/\.$/.test(formattedValue)) {
		formattedValue = formattedValue.replace(/\./, '');
	}

	if (currency) {
		return formatCurrency(formattedValue, currency);
	}

	return formattedValue;
}
