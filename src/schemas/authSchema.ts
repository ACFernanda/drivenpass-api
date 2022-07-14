import joi from "joi";
import { CreateUserData } from "../repositories/authRepository";

export const signUpSchema = joi.object<CreateUserData>({
  email: joi.string().email().required(),
  password: joi.string().required().min(10),
});

export const signInSchema = joi.object<CreateUserData>({
  email: joi.string().email().required(),
  password: joi.string().required(),
});
