export const getObjectLength = (object) => {
	return typeof object === 'object' ? Object.values(object).length : false;
};

export const isElementVisible = (element) => {
	return !!(element.offsetWidth || element.offsetHeight || element.getClientRects().length);
};

export const reflow = (element) => {
	element.offsetHeight;
};
