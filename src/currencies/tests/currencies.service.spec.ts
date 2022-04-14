import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { CurrenciesService } from '../currencies.service';
import { HttpService } from '@nestjs/axios';
import { of } from 'rxjs';
import mock from './currencies.mock';

describe('CurrenciesService', () => {
	let service: CurrenciesService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				CurrenciesService,
				{
					provide: ConfigService,
					useValue: {
						get: jest.fn(),
					},
				},
				{
					provide: HttpService,
					useValue: {
						get: jest.fn(() => of(mock.blockchainListResponse)),
					},
				},
			],
		}).compile();

		service = module.get<CurrenciesService>(CurrenciesService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	describe('getAvailableCryptoCurrencies', () => {
		it('should return an array of crypto currencies', async () => {
			const result = await service.getAvailableCryptoCurrencies();
			expect(result).toEqual(mock.cryptoCurrenciesSymbols);
		});
	});
});
