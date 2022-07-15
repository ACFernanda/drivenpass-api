import joi from "joi";
import { CreateCardData } from "../repositories/cardRepository.js";

export const cardSchema = joi.object<CreateCardData>({
  title: joi.string().required(),
  number: joi.string().length(16).required(),
  name: joi.string().required(),
  securityCode: joi
    .string()
    .pattern(/^[0-9]{3}/)
    .required(),
  expirationDate: joi
    .string()
    .pattern(/^(0[1-9]|1[0-2])\/?([0-9]{2})/)
    .required(),
  password: joi.string().required(),
  isVirtual: joi.boolean().required(),
  type: joi.string().valid("credit", "debit", "credit_debit").required(),
});
