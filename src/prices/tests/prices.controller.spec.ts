import { Test, TestingModule } from '@nestjs/testing';
import mock from './prices.mock';
import { HttpException } from '@nestjs/common';
import { PricesService } from '../prices.service';
import { PricesController } from '../prices.controller';

describe('PricesController', () => {
	let controller: PricesController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [PricesController],
			providers: [
				{
					provide: PricesService,
					useValue: {
						get: jest.fn(),
					},
				},
			],
		}).compile();

		controller = module.get<PricesController>(PricesController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});

	describe('getPrices', () => {
		it('Should throw HttpException error with message of single not valid', async () => {
			try {
				await controller.getPrices(['USD', 'EUR', 'FFF'], ['BTC']);
			} catch (e) {
				expect(e).toBeInstanceOf(HttpException);
				expect(e.message).toBe('FFF is not part of the available fiat currencies');
			}
		});

		it('Should throw HttpException error with message of many not valid', async () => {
			try {
				await controller.getPrices(['USD', 'EUR', 'FFF', 'LLL'], ['BTC']);
			} catch (e) {
				expect(e).toBeInstanceOf(HttpException);
				expect(e.message).toBe('FFF, LLL are not part of the available fiat currencies');
			}
		});

		it('Should throw HttpException error with message more then allowed', async () => {
			try {
				await controller.getPrices(['USD', 'EUR'], mock.moreThan30Currencies);
			} catch (e) {
				expect(e).toBeInstanceOf(HttpException);
				expect(e.message).toBe('cryptocurrencies can not be more than 30');
			}
		});
	});
});
