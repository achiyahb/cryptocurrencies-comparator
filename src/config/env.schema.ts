import * as Joi from 'joi';

export const envSchema = {
  PORT: Joi.number().default(3000),
};
