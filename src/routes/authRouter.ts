import { Router } from "express";

import schemaValidatorMiddleware from "../middlewares/schemaValidator.js";
import { signUpSchema, signInSchema } from "../schemas/authSchema.js";
import { signUp, signIn } from "../controllers/authController.js";

const authRouter = Router();

authRouter.post("/sign-up", schemaValidatorMiddleware(signUpSchema), signUp);
authRouter.post("/sign-in", schemaValidatorMiddleware(signInSchema), signIn);

export default authRouter;
