import prisma from "../config/db.js";
import { cards } from "@prisma/client";
import { UserTokenInfo } from "./authRepository.js";

export type CreateCardData = Omit<cards, "id" | "userId">;

export async function checkTitle(user: UserTokenInfo, cardTitle: string) {
  const card = await prisma.cards.findFirst({
    where: { userId: user.id, title: cardTitle },
  });

  return card;
}

export async function insert(user: UserTokenInfo, cardData: CreateCardData) {
  await prisma.cards.create({
    data: { ...cardData, userId: user.id },
  });
}

export async function getOne(user: UserTokenInfo, cardId: number) {
  const card = await prisma.cards.findFirst({
    where: { userId: user.id, id: cardId },
  });

  return card;
}

export async function getAll(user: UserTokenInfo) {
  const cards = await prisma.cards.findMany({
    where: { userId: user.id },
  });
  return cards;
}

export async function deleteCard(user: UserTokenInfo, cardId: number) {
  await prisma.cards.deleteMany({
    where: { userId: user.id, id: cardId },
  });

  return;
}
