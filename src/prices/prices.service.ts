import { Injectable } from '@nestjs/common';

@Injectable()
export class PricesService {
  async getPrices() {
    return Promise.resolve(undefined);
  }
}
