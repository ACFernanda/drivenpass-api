import { CreateNoteData } from "../repositories/noteRepository.js";
import { UserTokenInfo } from "../repositories/authRepository.js";
import * as noteRepository from "../repositories/noteRepository.js";

export async function createNote(
  user: UserTokenInfo,
  noteData: CreateNoteData
) {
  const note = await noteRepository.checkTitle(user, noteData.title);

  if (note) {
    throw {
      type: "conflict",
      message: `Note title already in use!`,
    };
  }

  await noteRepository.insert(user, noteData);
}

export async function getNote(user: UserTokenInfo, noteId: number) {
  const note = await checkIfNoteExists(user, noteId);
  return note;
}

export async function getAllNotes(user: UserTokenInfo) {
  const notes = await noteRepository.getAll(user);
  return notes;
}

export async function deleteNote(user: UserTokenInfo, noteId: number) {
  await checkIfNoteExists(user, noteId);
  await noteRepository.deleteNote(user, noteId);
}

async function checkIfNoteExists(user: UserTokenInfo, noteId: number) {
  const note = await noteRepository.getOne(user, noteId);

  if (!note) {
    throw {
      type: "not_found",
      message: `Note not found!`,
    };
  }

  return note;
}
