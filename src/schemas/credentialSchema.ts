import joi from "joi";
import { CreateCredentialData } from "../repositories/credentialRepository.js";

export const credentialSchema = joi.object<CreateCredentialData>({
  userId: joi.number().integer().required(),
  title: joi.string().required(),
  url: joi.string().uri().required(),
  user: joi.string().required(),
  password: joi.string().required(),
});
