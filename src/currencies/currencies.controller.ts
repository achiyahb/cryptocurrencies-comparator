import { Controller, Get } from '@nestjs/common';
import { CurrenciesService } from './currencies.service';

@Controller('currencies')
export class CurrenciesController {
  constructor(private readonly currenciesService: CurrenciesService) {}

  @Get('crypto')
  async getAvailableCryptoCurrencies() {
    return await this.currenciesService.getAvailableCryptoCurrencies();
  }

  @Get('fiat')
  async getAvailableFiatCurrencies() {
    return await this.currenciesService.getAvailableFiatCurrencies();
  }
}
