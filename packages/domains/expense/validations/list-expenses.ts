import Joi from 'joi';
import { RequestValidationSchemaType } from '@nc/utils/request-validation';

const sortingCols = new Set(['merchant_name', 'amount_in_cents', 'currency', 'id', 'date_created', 'status']);
const sortTypes = new Set(['asc', 'desc']);

const sortValidator: Joi.CustomValidator<any> = (value) => {
  const [column, type] = value.split(':');

  const isInvalid = !sortTypes.has(type) || !sortingCols.has(column);

  if (isInvalid) throw new Error('invalid sort');

  return { column, type: type === 'asc' ? 1 : -1 };
};

export const listExpenseValidation: RequestValidationSchemaType = Joi.object({
  query: Joi.object({
    user_id: Joi.string()
      .uuid({ version: 'uuidv4' })
      .required()
      .error(new Error('user_id query is required and must be a valid uuid-v4!')),

    merchant_name_like: Joi.string()
      .min(2)
      .trim()
      .alphanum()
      .error(new Error('merchant_name_like query must have at least 2 chars and contain "alphanumeric" characters only!')),

    status: Joi.string()
      .allow(...['processing', 'pending'])
      .error(new Error('status query must be one of "processing", "pending" only!')),

    offset: Joi.number()
      .min(0)
      .error(new Error('offset query minimum value is zero!')),

    limit: Joi.number()
      .min(1)
      .max(50)
      .error(new Error('limit query must be between 1 and 50!')),

    sort: Joi.array()
      .items(
        Joi.string()
          .custom(sortValidator, 'sort validation')
          .error(new Error(`sort query must be one of ${Array.from(sortingCols).join(', ')}, optionally followed by type ex: (id:asc, id:desc)`))
      )
      .single()
      .unique()
      .min(1),
  }),
});
