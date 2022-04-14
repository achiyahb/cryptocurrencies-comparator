import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { of } from 'rxjs';
import mock from './currencies.mock';
import { HttpException } from '@nestjs/common';
import { PricesService } from '../prices.service';

describe('PricesService', () => {
	let service: PricesService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				PricesService,
				{
					provide: ConfigService,
					useValue: {
						get: jest.fn(),
					},
				},
				{
					provide: HttpService,
					useValue: {
						get: jest.fn((url, { params }) => {
							if (params.fsyms === mock.notValidCurrency) {
								return of(mock.currenciesNorValidResponse);
							} else if (params.fsyms === '') {
								return of(mock.otherErrorResponse);
							} else if (params.fsyms === 'BTS') {
								return of(mock.goodProviderResponse);
							}
						}),
					},
				},
			],
		}).compile();

		service = module.get<PricesService>(PricesService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	describe('getPrices', () => {
		it('Should throw http exception when cryptocurrencies input are not available', async () => {
			try {
				await service.getPrices(['USD', 'EUR'], [mock.notValidCurrency]);
			} catch (e) {
				expect(e).toBeInstanceOf(HttpException);
				expect(e.message).toBe(
					'some of crypto currencies inputs are not available, please check our crypto available list'
				);
			}
		});

		it('Should return provider message when the error cause from other reason', async () => {
			try {
				await service.getPrices(['USD', 'EUR'], ['']);
			} catch (e) {
				expect(e).toBeInstanceOf(HttpException);
				expect(e.message).toBe(mock.otherErrorResponse.data.Message);
			}
		});

		it('Should return expected result', async () => {
			const prices = await service.getPrices(['USD', 'EUR'], ['BTS']);
			expect(prices).toEqual(mock.expectedResult);
		});
	});
});
