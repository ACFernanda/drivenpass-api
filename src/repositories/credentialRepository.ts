import prisma from "../config/db.js";
import { credentials } from "@prisma/client";
import { UserTokenInfo } from "./authRepository.js";

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

export async function getOne(user: UserTokenInfo, credentialId: number) {
  const credential = await prisma.credentials.findFirst({
    where: { userId: user.id, id: credentialId },
  });

  return credential;
}

export async function getAll(user: UserTokenInfo) {
  const credentials = await prisma.credentials.findMany({
    where: { userId: user.id },
  });
  return credentials;
}

export async function deleteCredential(
  user: UserTokenInfo,
  credentialId: number
) {
  await prisma.credentials.deleteMany({
    where: { userId: user.id, id: credentialId },
  });

  return;
}
