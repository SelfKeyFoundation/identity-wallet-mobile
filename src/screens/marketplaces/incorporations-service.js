import { isDevMode } from 'configs';
import { camelCase, mapKeys } from 'lodash';

// TODO: use INCORPORATION_API_URL env variable
const incorporationApiUrl = 'https://passports.io/api/incorporations';

export async function fetchBankAccounts() {
	// TODO: move URLs to config
	const fetched = await fetch('https://api.bankaccounts.io/api/bank-accounts').then(res =>
		res.json(),
	);

	const mapData = field => (acc, curr) => {
		const details = mapKeys(curr.data.fields, (value, key) => camelCase(key));
		return { ...acc, [details[field]]: details };
	};

	const jurisdictions = fetched.Jurisdictions.reduce(mapData('countryCode'), {});
	const accDetails = fetched.Account_Details.reduce(mapData('bankCode'), {});

	const items = fetched.Main.map(itm => mapKeys(itm.data.fields, (value, key) => camelCase(key)))
		.filter(itm => itm.region && (itm.accountCode || itm.countryCode))
		.map(itm => {
			itm.accountCode = '' + itm.accountCode.trim() || null;
			itm.countryCode = '' + itm.countryCode.trim() || null;
			const sku = `FT-BNK-${itm.accountCode || itm.countryCode}`;
			const name = `${itm.region} ${itm.accountCode || itm.countryCode}`;
			const price = itm.activeTestPrice ? itm.testPrice : itm.price;
			itm = {
				sku,
				name,
				status: itm.showWallet ? 'active' : 'inactive',
				price,
				priceCurrency: 'USD',
				category: 'banking',
				vendorId: 'flagtheory_banking',
				data: {
					...itm,
					jurisdiction: jurisdictions[itm.countryCode] || {},
					accounts: Object.keys(accDetails)
						.filter(key => accDetails[key].accountCode === itm.accountCode)
						.reduce((obj, key) => {
							obj[key] = accDetails[key];
							return obj;
						}, {}),
				},
			};

			itm.data.type =
				itm.data.type && itm.data.type.length ? itm.data.type[0].toLowerCase() : 'private';
			itm.entityType = itm.data.type === 'business' ? 'corporate' : 'individual';
			return itm;
		});

	return items;
}

export async function fetchIncorporations() {
	const fetched = await fetch(incorporationApiUrl).then(res => res.json());
	const isDev = isDevMode();

	const mapCorpDetails = (corps, curr) => {
		const corpDetails = mapKeys(curr.data.fields, (value, key) => camelCase(key));
		return { ...corps, [corpDetails.companyCode]: corpDetails };
	};

	let corpDetails = fetched.Corporations.reduce(mapCorpDetails, {});
	corpDetails = fetched.LLCs.reduce(mapCorpDetails, corpDetails);
	corpDetails = fetched.Foundations.reduce(mapCorpDetails, corpDetails);
	corpDetails = fetched.Trusts.reduce(mapCorpDetails, corpDetails);
	const enTranslations = fetched.EN.reduce(mapCorpDetails, {});
	const taxes = fetched.Taxes.reduce(mapCorpDetails, {});

	const items = fetched.Main.filter(i => i.data.fields.showApp && i.data.fields.template_id).map(
		itm => {
			const data = mapKeys(itm.data.fields, (value, key) => camelCase(key));
			if (!data) {
				return null;
			}
			data.companyCode = '' + data.companyCode.trim() || null;
			data.countryCode = '' + data.countryCode.trim() || null;
			const sku = `FT-INC-${data.companyCode}`;
			let name = data.region;
			if (data.acronym && data.acronym.length) {
				name += ` (${data.acronym.join(', ')})`;
			}

			let price = data.walletPrice && +data.walletPrice;

			if (isDev && data.testPrice) {
				price = +data.testPrice;
			}

			return {
				sku,
				name,
				status: data.templateId && data.showInWallet && price ? 'active' : 'inactive',
				price: price,
				priceCurrency: 'USD',
				category: 'incorporations',
				vendorId: 'flagtheory_incorporations',
				entityType: 'individual',
				data: {
					...data,
					...(corpDetails[data.companyCode] || {}),
					...(taxes[data.companyCode] || {}),
					en: { ...(enTranslations[data.companyCode] || {}) },
				},
			};
		},
	);

	return items;
}
