import { ApiProperty } from '@nestjs/swagger';

export class PricesResponseDto {
	@ApiProperty({ example: ['BTC', 'ETH', '...', '...'] })
	availableCryptocurrencies: string[];
}
