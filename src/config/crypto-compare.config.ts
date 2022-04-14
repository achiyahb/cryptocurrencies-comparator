import { registerAs } from '@nestjs/config';

export const cryptoCompareConfig = registerAs('cryptoCompare', () => ({
  apiKey: `Apikey ${process.env.CRYPTO_COMPARE_API_KEY}`,
  url: 'https://min-api.cryptocompare.com/data/',
}));
