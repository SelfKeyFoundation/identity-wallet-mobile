export function formatAddress(address) {
	if (!address) {
		return ''
	}

	const firstPart = address.substring(0, 12);
	const lastPart = address.substring(address.length - 6, address.length);

	return `${firstPart}...${lastPart}`.toLowerCase();
}