import Joi from 'joi';
import { RequestValidationSchemaType } from '@nc/utils/request-validation';

export const getUserValidation: RequestValidationSchemaType = Joi.object({
  params: Joi.object({
    id: Joi.string()
      .uuid({ version: 'uuidv4' })
      .required()
      .error(new Error('user_id param must be a valid uuid-v4!')),
  }),
});
