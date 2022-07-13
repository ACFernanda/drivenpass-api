import { Router } from "express";
import { tokenValidator } from "../middlewares/tokenValidator.js";

const credentialsRouter = Router();

credentialsRouter.use(tokenValidator);

export default credentialsRouter;
