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

export async function getCredential(credentialId: number) {}

export async function getAllCredentials() {}

export async function deleteCredential(credentialId: number) {}
