import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { availableFiatCurrencies } from './currencies.constants';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class CurrenciesService {
  constructor(
    private configService: ConfigService,
    private httpService: HttpService,
  ) {}

  async getAvailableCryptoCurrencies(): Promise<string[]> {
    const url = this.configService.get('cryptoCompare.url');
    const availableCoinsData = await firstValueFrom(
      this.httpService.get(`${url}blockchain/list`, {
        headers: {
          Authorization: this.configService.get('cryptoCompare.apiKey'),
        },
      }),
    );
    return Object.keys(availableCoinsData.data.Data);
  }

  async getAvailableFiatCurrencies() {
    return availableFiatCurrencies;
  }
}
