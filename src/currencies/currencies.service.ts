import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';
import { availableFiatCurrencies } from './currencies.constants';

@Injectable()
export class CurrenciesService {
  constructor(private configService: ConfigService) {}

  async getAvailableCryptoCurrencies(): Promise<string[]> {
    const url = this.configService.get('cryptoCompare.url');
    const availableCoinsData = await axios.get(`${url}blockchain/list`, {
      headers: {
        Authorization: this.configService.get('cryptoCompare.apiKey'),
      },
    });
    return Object.keys(availableCoinsData.data.Data);
  }

  async getAvailableFiatCurrencies() {
    return availableFiatCurrencies;
  }
}
