import { BadRequest } from './errors';
import express from 'express';
import Joi from 'joi';

export type RequestValidationSchemaType = Joi.Schema<{
  query?: Joi.Schema
  body?: Joi.Schema
  params?: Joi.Schema
}>

export const validate = (schema: RequestValidationSchemaType) => {
  const options = { abortEarly: false, allowUnknown: true, stripUnknown: true };

  return (req: express.Request, _: express.Response, next: express.NextFunction) => {
    const data = { body: req.body, params: req.params, query: req.query };
    const { error, value } = schema.validate(data, options);

    if (error) {
      const message = error.details?.length ?
        `Validation error: ${error.details.map((x) => x.message).join(', ')}` : error.message;

      next(BadRequest(message, req));
    }

    Object.assign(req, value);
    next();
  };
};
