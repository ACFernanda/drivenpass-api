import { Router } from "express";
import { tokenValidator } from "../middlewares/tokenValidator.js";
import schemaValidator from "../middlewares/schemaValidator.js";
import {
  createCard,
  getCard,
  deleteCard,
} from "../controllers/cardsController.js";
import { cardSchema } from "../schemas/cardSchema.js";

const cardsRouter = Router();

cardsRouter.use(tokenValidator);

cardsRouter.post("/cards", schemaValidator(cardSchema), createCard);
cardsRouter.get("/cards", getCard);
cardsRouter.delete("/cards/:id", deleteCard);

export default cardsRouter;
