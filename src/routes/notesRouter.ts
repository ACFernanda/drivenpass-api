import { Router } from "express";
import { tokenValidator } from "../middlewares/tokenValidator.js";
import schemaValidator from "../middlewares/schemaValidator.js";
import {
  createNote,
  getNote,
  deleteNote,
} from "../controllers/notesController.js";
import { noteSchema } from "../schemas/noteSchema.js";

const notesRouter = Router();

notesRouter.use(tokenValidator);

notesRouter.post("/notes", schemaValidator(noteSchema), createNote);
notesRouter.get("/notes", getNote);
notesRouter.delete("/notes/:id", deleteNote);

export default notesRouter;
