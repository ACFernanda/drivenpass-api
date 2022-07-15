import { Request, Response } from "express";

import { CreateCardData } from "../repositories/cardRepository.js";
import { UserTokenInfo } from "../repositories/authRepository.js";
import * as cardService from "../services/cardService.js";

export async function createCard(req: Request, res: Response) {
  const cardData: CreateCardData = req.body;
  const user: UserTokenInfo = res.locals.user;
  await cardService.createCard(user, cardData);
  res.sendStatus(201);
}

export async function getCard(req: Request, res: Response) {
  const cardId = +req.query.id;
  const user: UserTokenInfo = res.locals.user;

  if (!cardId) {
    const cards = await cardService.getAllCards(user);
    return res.status(200).send(cards);
  }

  const card = await cardService.getCard(user, cardId);
  res.status(200).send(card);
}

export async function deleteCard(req: Request, res: Response) {
  const cardId = +req.params.id;
  const user: UserTokenInfo = res.locals.user;
  await cardService.deleteCard(user, cardId);

  res.sendStatus(200);
}
