import Joi from "joi";
import { Middleware } from "../types";

export const QueryValidator: Middleware = (req, res, next) => {
  const schema = Joi.object({
    sortBy: Joi.string().valid("status", "amount_in_cents", "date_created"),
    status: Joi.string().valid("pending", "processed"),
    currency: Joi.string().length(3).max(4),
    merchant_name: Joi.string().max(30),
    userId: Joi.string().required(),
    pageSize: Joi.number(),
    page: Joi.number(),
  }).required();

  const { error }: any = schema.valid(req.query);

  if (error) {
    return res.status(403).json({ error: error.message });
  }
  next();
};
