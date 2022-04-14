import { Controller, Get, HttpException, HttpStatus, ParseArrayPipe, Query } from '@nestjs/common';
import { PricesService } from './prices.service';
import { availableFiatCurrencies } from '../currencies/currencies.constants';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PriceResponseDto } from '../currencies/dtos/crypto-response.dto';

@ApiTags('Prices')
@Controller('prices')
export class PricesController {
	constructor(private readonly pricesService: PricesService) {}

	@Get()
	@ApiOperation({ summary: 'Get currencies prices' })
	@ApiResponse({ type: PriceResponseDto, isArray: true })
	async getPrices(
		@Query('fiat', ParseArrayPipe) fiatCurrencies: string[] = ['USD'],
		@Query('crypto', ParseArrayPipe) cryptoCurrencies: string[]
	) {
		this.validateAvailableFiat(fiatCurrencies);
		this.validateCryptoAllowedLength(cryptoCurrencies);
		return await this.pricesService.getPrices(fiatCurrencies, cryptoCurrencies);
	}

	private validateAvailableFiat(currencies: string[]) {
		const notValidFiats = currencies.filter((currency) => !availableFiatCurrencies.includes(currency));
		if (notValidFiats.length) {
			throw new HttpException(
				`${notValidFiats.join(', ')} ${
					notValidFiats.length === 1 ? 'is' : 'are'
				} not part of the available fiat currencies`,
				HttpStatus.BAD_REQUEST
			);
		}
	}

	private validateCryptoAllowedLength(cryptoCurrencies: string[]) {
		if (cryptoCurrencies.length > 30) {
			throw new HttpException('cryptocurrencies can not be more than 30', HttpStatus.BAD_REQUEST);
		}
	}
}
