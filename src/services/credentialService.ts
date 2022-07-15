import Cryptr from "cryptr";

import { CreateCredentialData } from "../repositories/credentialRepository.js";
import { UserTokenInfo } from "../repositories/authRepository.js";
import * as credentialRepository from "../repositories/credentialRepository.js";

const cryptr = new Cryptr(process.env.CRYPTR_KEY);

export async function createCredential(
  user: UserTokenInfo,
  credentialData: CreateCredentialData
) {
  const credential = await credentialRepository.checkTitle(
    user,
    credentialData.title
  );

  if (credential) {
    throw {
      type: "conflict",
      message: `Credential title already in use!`,
    };
  }

  const encryptPassword = cryptr.encrypt(credentialData.password);
  credentialData.password = encryptPassword;

  await credentialRepository.insert(user, credentialData);
}

export async function getCredential(user: UserTokenInfo, credentialId: number) {
  const credential = await checkIfCredentialExists(user, credentialId);

  const decryptedPassword = cryptr.decrypt(credential.password);
  credential.password = decryptedPassword;

  return credential;
}

export async function getAllCredentials(user: UserTokenInfo) {
  const credentials = await credentialRepository.getAll(user);

  credentials.forEach((credential) => {
    const decryptedString = cryptr.decrypt(credential.password);
    credential.password = decryptedString;
  });

  return credentials;
}

export async function deleteCredential(
  user: UserTokenInfo,
  credentialId: number
) {
  await checkIfCredentialExists(user, credentialId);
  await credentialRepository.deleteCredential(user, credentialId);
}

async function checkIfCredentialExists(
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

  return credential;
}
