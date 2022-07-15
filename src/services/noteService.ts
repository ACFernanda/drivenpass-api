import { CreateNoteData } from "../repositories/noteRepository.js";
import { UserTokenInfo } from "../repositories/authRepository.js";
import * as noteRepository from "../repositories/noteRepository.js";

export async function createNote(noteData: CreateNoteData) {
  const note = await noteRepository.checkTitle(noteData.userId, noteData.title);

  if (note) {
    throw {
      type: "conflict",
      message: `Note title already in use!`,
    };
  }

  await noteRepository.insert(noteData);
}

export async function getNote(user: UserTokenInfo, noteId: number) {
  const note = await noteRepository.getOne(user, noteId);

  if (!note) {
    throw {
      type: "not_found",
      message: `Note not found!`,
    };
  }

  return note;
}

export async function getAllNotes(user: UserTokenInfo) {
  const notes = await noteRepository.getAll(user);
  return notes;
}

export async function deleteNote(user: UserTokenInfo, noteId: number) {
  const note = await noteRepository.getOne(user, noteId);

  if (!note) {
    throw {
      type: "not_found",
      message: `Note not found!`,
    };
  }

  await noteRepository.deleteNote(user, noteId);
  return;
}
