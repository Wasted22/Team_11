export const getObjectLength = (object) => {
	return typeof object === 'object' && object !== null ? Object.values(object).length : null;
};

export const isElementVisible = (element) => {
	return !!(element.offsetWidth || element.offsetHeight || element.getClientRects().length);
};

export const reflow = (element) => {
	// eslint-disable-next-line no-unused-expressions
	element.offsetHeight;
};
