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

const moreThan30Currencies = [
	'BTC',
	'FRE',
	'0XBTC',
	'1ST',
	'1WO',
	'AAC',
	'ABCC',
	'ABT',
	'ABYSS',
	'ACCN',
	'ACE',
	'ADA',
	'ADB',
	'ADH',
	'ADI',
	'ADL',
	'ADT',
	'ADX',
	'AE',
	'AEN',
	'AERGO',
	'AGI',
	'AGVC',
	'AID',
	'AIDOC',
	'AIT',
	'AIX',
	'ALIS',
	'ALX',
	'AMB',
	'AMLT',
	'AMM',
];

export default {
	currenciesNorValidResponse,
	otherErrorResponse,
	notValidCurrency,
	expectedResult,
	goodProviderResponse,
	moreThan30Currencies,
};
