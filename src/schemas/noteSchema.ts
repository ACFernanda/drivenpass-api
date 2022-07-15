import joi from "joi";
import { CreateNoteData } from "../repositories/noteRepository.js";

const TITLE_LENGTH = 50;
const NOTE_LENGTH = 1000;

export const noteSchema = joi.object<CreateNoteData>({
  title: joi.string().max(TITLE_LENGTH).required(),
  note: joi.string().max(NOTE_LENGTH).required(),
});
