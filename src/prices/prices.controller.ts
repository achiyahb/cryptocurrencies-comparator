import { Controller } from '@nestjs/common';
import { PricesService } from './prices.service';

@Controller('prices')
export class PricesController {
  constructor(private readonly pricesService: PricesService) {}

  async getPrices() {
    return await this.pricesService.getPrices();
  }
}
