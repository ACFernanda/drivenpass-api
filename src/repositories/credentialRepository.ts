import prisma from "../config/db.js";
import { credentials } from "@prisma/client";

export type CreateCredentialData = Omit<credentials, "id">;

export async function checkTitle(userId: number, credentialTitle: string) {
  const credential = await prisma.credentials.findFirst({
    where: { userId, title: credentialTitle },
  });

  return credential;
}

export async function insert(credentialData: CreateCredentialData) {
  await prisma.credentials.create({ data: credentialData });
}

export async function getAll(userId: number) {
  const credentials = await prisma.credentials.findMany({ where: { userId } });
  return credentials;
}

export async function getOne(userId, credentialId) {
  const credential = await prisma.credentials.findFirst({
    where: { userId, id: parseInt(credentialId) },
  });

  return credential;
}
