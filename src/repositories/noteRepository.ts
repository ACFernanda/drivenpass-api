import prisma from "../config/db.js";
import { notes } from "@prisma/client";
import { UserTokenInfo } from "./authRepository.js";

export type CreateNoteData = Omit<notes, "id">;

export async function checkTitle(userId: number, noteTitle: string) {
  const note = await prisma.notes.findFirst({
    where: { userId, title: noteTitle },
  });

  return note;
}

export async function insert(noteData: CreateNoteData) {
  await prisma.notes.create({ data: noteData });
}

export async function getOne(user: UserTokenInfo, noteId: number) {
  const note = await prisma.notes.findFirst({
    where: { userId: user.id, id: noteId },
  });

  return note;
}

export async function getAll(user: UserTokenInfo) {
  const notes = await prisma.notes.findMany({
    where: { userId: user.id },
  });
  return notes;
}

export async function deleteNote(user: UserTokenInfo, noteId: number) {
  await prisma.notes.deleteMany({
    where: { userId: user.id, id: noteId },
  });

  return;
}
