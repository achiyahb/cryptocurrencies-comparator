import { ApiProperty } from '@nestjs/swagger';
import { availableFiatCurrencies } from '../currencies.constants';

export class FiatResponseDto {
	@ApiProperty({ example: availableFiatCurrencies })
	availableFiatCurrencies: string[];
}
