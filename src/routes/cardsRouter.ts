import { Router } from "express";
import { tokenValidator } from "../middlewares/tokenValidator.js";

const cardsRouter = Router();

cardsRouter.use(tokenValidator);

export default cardsRouter;
