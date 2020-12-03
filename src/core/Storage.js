import AsyncStorage from '@react-native-async-storage/async-storage';

export const Storage = {
	Key: {
		UserPreferences: '@user-preferences',
		WalletConnectSession: '@wallet-connect-session',
	},
	async getItem(key, defaultValue) {
		try {
			const result = await AsyncStorage.getItem(key);
			return JSON.parse(result);
		} catch (err) {}

		return defaultValue;
	},
	async updateItem(key, updateFunc) {
		const currentValue = await Storage.getItem(key);
		return Storage.setItem(key, updateFunc(currentValue));
	},
	async setItem(key, value) {
		return AsyncStorage.setItem(key, JSON.stringify(value));
	},
};

const defaultPreferences = {
	skipKeyFiEligibility: false,
};

export async function getUserPreferences() {
	let preferences = await Storage.getItem(Storage.Key.UserPreferences);

	if (!preferences) {
		preferences = defaultPreferences;
	}

	return preferences;
}

export function updateUserPreferences(data) {
	return Storage.updateItem(Storage.Key.UserPreferences, (item = defaultPreferences) => ({
		...item,
		...data,
	}));
}

export function withLocalCache({ cacheId, fetcher }) {
	return async function(...args) {
		const cacheKey = `${cacheId}-${args.join('-')}`;
    const cachedData = await Storage.getItem(cacheKey);

		const fetchAndStore = () =>
			fetcher(...args).then(async data => {
				await Storage.setItem(cacheKey, data);
				return data;
			});

		let result = fetchAndStore();

		if (cachedData) {
			return cachedData;
		}

		return result;
	};
}
