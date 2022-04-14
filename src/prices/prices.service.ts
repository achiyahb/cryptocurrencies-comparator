import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class PricesService {
	constructor(private configService: ConfigService, private httpService: HttpService) {}

	async getPrices(fiatCurrencies: string[], cryptoCurrencies: string[]) {
		const url = this.configService.get('cryptoCompare.url');
		const endpoint = 'pricemulti';
		const currenciesPriceData = await firstValueFrom(
			this.httpService.get(`${url}${endpoint}`, {
				headers: {
					Authorization: this.configService.get('cryptoCompare.apiKey'),
				},
				params: {
					fsyms: cryptoCurrencies.join(','),
					tsyms: fiatCurrencies.join(','),
				},
			})
		);
		if (currenciesPriceData.data.Response === 'Error') {
			if (currenciesPriceData.data.Message.includes('cccagg_or_exchange market does not exist for this coin pair')) {
				throw new HttpException(
					'some of crypto currencies inputs are not available, please check our crypto available list',
					HttpStatus.BAD_REQUEST
				);
			}
			throw new HttpException(currenciesPriceData.data.Message, HttpStatus.BAD_REQUEST);
		}
		const pricesArray = Object.entries(currenciesPriceData.data);
		return pricesArray.map(([cryptocurrencySymbol, prices]) => ({
			cryptocurrencySymbol,
			prices,
		}));
	}
}
