import { Request, Response } from "express";

import { CreateCredentialData } from "../repositories/credentialRepository.js";
import * as credentialService from "../services/credentialService.js";

export async function createCredential(req: Request, res: Response) {
  const credentialData: CreateCredentialData = req.body;
  await credentialService.createCredential(credentialData);
  res.sendStatus(201);
}

export async function getCredential(req: Request, res: Response) {
  const credentialId: number = parseInt(req.params.id);

  if (!credentialId) {
    const credentials = await credentialService.getAllCredentials();
    return res.status(200).send(credentials);
  }

  const credential = await credentialService.getCredential(credentialId);
  res.status(200).send(credential);
}

export async function deleteCredential(req: Request, res: Response) {
  const credentialId: number = parseInt(req.body.id);
  await credentialService.deleteCredential(credentialId);
  res.sendStatus(200);
}
