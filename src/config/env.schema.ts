import * as Joi from 'joi';

export const envSchema = {
	PORT: Joi.number().default(3000),
	CRYPTO_COMPARE_API_KEY: Joi.string().required(),
};
