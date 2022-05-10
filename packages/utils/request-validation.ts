import { BadRequest } from './errors';

import express from 'express';
import Joi from 'joi';

export type RequestValidationSchemaType = {
  query?: Joi.Schema
  body?: Joi.Schema
  params?: Joi.Schema
}

export const validate = (schema: Joi.Schema) => {
  const options = { abortEarly: false, allowUnknown: true, stripUnknown: true };

  return (req: express.Request, _: express.Response, next: express.NextFunction) => {
    const data = { body: req.body, params: req.params, query: req.query };

    const { error, value: validatedData } = schema.validate(data, options);

    if (error) {
      const message = `Validation error: ${error.details.map((x: Joi.ValidationErrorItem) => x.message).join(', ')}`;

      next(BadRequest(message));
    }

    Object.assign(req, validatedData);

    next();
  };
};
