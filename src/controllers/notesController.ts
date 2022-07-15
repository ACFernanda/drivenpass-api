import { Request, Response } from "express";

import { CreateNoteData } from "../repositories/noteRepository.js";
import { UserTokenInfo } from "../repositories/authRepository.js";
import * as noteService from "../services/noteService.js";

export async function createNote(req: Request, res: Response) {
  const noteData: CreateNoteData = req.body;
  const user: UserTokenInfo = res.locals.user;
  await noteService.createNote(user, noteData);
  res.sendStatus(201);
}

export async function getNote(req: Request, res: Response) {
  const noteId = +req.query.id;
  const user: UserTokenInfo = res.locals.user;

  if (!noteId) {
    const notes = await noteService.getAllNotes(user);
    return res.status(200).send(notes);
  }

  const note = await noteService.getNote(user, noteId);
  res.status(200).send(note);
}

export async function deleteNote(req: Request, res: Response) {
  const noteId = +req.params.id;
  const user: UserTokenInfo = res.locals.user;
  await noteService.deleteNote(user, noteId);

  res.sendStatus(200);
}
