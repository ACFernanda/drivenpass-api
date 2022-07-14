import Cryptr from "cryptr";

import { CreateCredentialData } from "../repositories/credentialRepository.js";
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

export async function getCredential(user, credentialId) {
  const credential = await credentialRepository.getOne(user.id, credentialId);

  const cryptr = new Cryptr(process.env.CRYPTR_KEY);
  const decryptedString = cryptr.decrypt(credential.password);
  console.log(decryptedString);

  credential.password = decryptedString;
  return credential;
}

export async function getAllCredentials(user) {
  const credentials = await credentialRepository.getAll(user.id);

  credentials.forEach((credential) => {
    const cryptr = new Cryptr(process.env.CRYPTR_KEY);
    const decryptedString = cryptr.decrypt(credential.password);

    credential.password = decryptedString;
  });
  return credentials;
}

export async function deleteCredential(credentialId: number) {}
