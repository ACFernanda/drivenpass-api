import Cryptr from "cryptr";

import { CreateCredentialData } from "../repositories/credentialRepository.js";
import { UserTokenInfo } from "../repositories/credentialRepository.js";
import * as credentialRepository from "../repositories/credentialRepository.js";

export async function createCredential(credentialData: CreateCredentialData) {
  const credential = await credentialRepository.checkTitle(
    credentialData.userId,
    credentialData.title
  );

  if (credential) {
    throw {
      type: "conflict",
      message: `Credential title already in use!`,
    };
  }

  const cryptr = new Cryptr(process.env.CRYPTR_KEY);
  const encryptPassword = cryptr.encrypt(credentialData.password);
  credentialData.password = encryptPassword;

  await credentialRepository.insert(credentialData);
}

export async function getCredential(user: UserTokenInfo, credentialId: number) {
  const credential = await credentialRepository.getOne(user, credentialId);

  if (!credential) {
    throw {
      type: "not_found",
      message: `Credential not found!`,
    };
  }

  const cryptr = new Cryptr(process.env.CRYPTR_KEY);
  const decryptedString = cryptr.decrypt(credential.password);

  credential.password = decryptedString;
  return credential;
}

export async function getAllCredentials(user: UserTokenInfo) {
  const credentials = await credentialRepository.getAll(user);

  credentials.forEach((credential) => {
    const cryptr = new Cryptr(process.env.CRYPTR_KEY);
    const decryptedString = cryptr.decrypt(credential.password);

    credential.password = decryptedString;
  });
  return credentials;
}

export async function deleteCredential(
  user: UserTokenInfo,
  credentialId: number
) {
  const credential = await credentialRepository.getOne(user, credentialId);

  if (!credential) {
    throw {
      type: "not_found",
      message: `Credential not found!`,
    };
  }

  await credentialRepository.deleteCredential(user, credentialId);
  return;
}
