import { Router } from "express";
import { tokenValidator } from "../middlewares/tokenValidator.js";

const notesRouter = Router();

notesRouter.use(tokenValidator);

export default notesRouter;
