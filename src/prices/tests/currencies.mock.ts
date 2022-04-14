const currenciesNorValidResponse = {
	data: {
		Response: 'Error',
		Message:
			'some string before _______ cccagg_or_exchange market does not exist for this coin pair ____some string after',
	},
};

const otherErrorResponse = {
	data: {
		Response: 'Error',
		Message: 'other error',
	},
};

const goodProviderResponse = {
	data: {
		BTS: {
			USD: 40659.25,
			EUR: 37750.27,
		},
	},
};

const expectedResult = [
	{
		cryptocurrencySymbol: 'BTS',
		prices: {
			USD: 40659.25,
			EUR: 37750.27,
		},
	},
];

const notValidCurrency = 'NOT_VALID_CURRENCY';

export default {
	currenciesNorValidResponse,
	otherErrorResponse,
	notValidCurrency,
	expectedResult,
	goodProviderResponse,
};
