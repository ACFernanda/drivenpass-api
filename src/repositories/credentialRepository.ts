import prisma from "../config/db.js";
import { credentials } from "@prisma/client";
import { UserTokenInfo } from "./authRepository.js";

export type CreateCredentialData = Omit<credentials, "id" | "userId">;

export async function checkTitle(user: UserTokenInfo, credentialTitle: string) {
  const credential = await prisma.credentials.findFirst({
    where: { userId: user.id, title: credentialTitle },
  });

  return credential;
}

export async function insert(
  user: UserTokenInfo,
  credentialData: CreateCredentialData
) {
  await prisma.credentials.create({
    data: { ...credentialData, userId: user.id },
  });
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
