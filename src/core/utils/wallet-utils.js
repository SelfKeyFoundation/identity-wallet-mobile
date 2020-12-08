
export function compactAddress(address, length = 6) {
	if (!address) {
		return ''
	}

	const firstPart = address.substring(0, length);
	const lastPart = address.substring(address.length - length, address.length);

	return `${firstPart}...${lastPart}`.toLowerCase();
}
