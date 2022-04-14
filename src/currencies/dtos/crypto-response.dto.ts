import { ApiProperty } from '@nestjs/swagger';

export class PriceResponseDto {
	@ApiProperty({ example: 'BTC' })
	cryptocurrencySymbol: string;

	@ApiProperty({ example: { USD: 1234, AUR: 1000 } })
	prices: Record<string, number>;
}
