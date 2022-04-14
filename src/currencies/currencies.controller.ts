import { Controller, Get } from '@nestjs/common';
import { CurrenciesService } from './currencies.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FiatResponseDto } from './dtos/fiat-response.dto';
import { PricesResponseDto } from '../prices/dtos/prices-response.dto';

@ApiTags('Currencies')
@Controller('currencies')
export class CurrenciesController {
	constructor(private readonly currenciesService: CurrenciesService) {}

	@Get('crypto')
	@ApiOperation({ summary: 'Get all available crypto currencies' })
	@ApiResponse({ type: PricesResponseDto, description: 'The available crypto currencies' })
	async getAvailableCryptoCurrencies() {
		const availableCryptocurrencies = await this.currenciesService.getAvailableCryptoCurrencies();
		return { availableCryptocurrencies };
	}

	@Get('fiat')
	@ApiOperation({ summary: 'Get all available fiat currencies' })
	@ApiResponse({ type: FiatResponseDto, description: 'The available fiat currencies' })
	async getAvailableFiatCurrencies() {
		const availableFiatCurrencies = await this.currenciesService.getAvailableFiatCurrencies();
		return { availableFiatCurrencies };
	}
}
