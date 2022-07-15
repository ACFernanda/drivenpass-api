import Cryptr from "cryptr";

import { CreateCardData } from "../repositories/cardRepository.js";
import { UserTokenInfo } from "../repositories/authRepository.js";
import * as cardRepository from "../repositories/cardRepository.js";

export async function createCard(
  user: UserTokenInfo,
  cardData: CreateCardData
) {
  const card = await cardRepository.checkTitle(user, cardData.title);

  if (card) {
    throw {
      type: "conflict",
      message: `Card title already in use!`,
    };
  }

  const cryptr = new Cryptr(process.env.CRYPTR_KEY);
  const encryptSecurityCode = cryptr.encrypt(cardData.securityCode);
  const encryptPassword = cryptr.encrypt(cardData.password);
  cardData.securityCode = encryptSecurityCode;
  cardData.password = encryptPassword;

  await cardRepository.insert(user, cardData);
}

export async function getCard(user: UserTokenInfo, cardId: number) {
  const card = await cardRepository.getOne(user, cardId);

  if (!card) {
    throw {
      type: "not_found",
      message: `Card not found!`,
    };
  }

  const cryptr = new Cryptr(process.env.CRYPTR_KEY);
  const decryptedSecurityCode = cryptr.decrypt(card.securityCode);
  const decryptedPassword = cryptr.decrypt(card.password);
  card.securityCode = decryptedSecurityCode;
  card.password = decryptedPassword;
  return card;
}

export async function getAllCards(user: UserTokenInfo) {
  const cards = await cardRepository.getAll(user);

  cards.forEach((card) => {
    const cryptr = new Cryptr(process.env.CRYPTR_KEY);
    const decryptedSecurityCode = cryptr.decrypt(card.securityCode);
    const decryptedPassword = cryptr.decrypt(card.password);
    card.securityCode = decryptedSecurityCode;
    card.password = decryptedPassword;
  });
  return cards;
}

export async function deleteCard(user: UserTokenInfo, cardId: number) {
  const card = await cardRepository.getOne(user, cardId);

  if (!card) {
    throw {
      type: "not_found",
      message: `Card not found!`,
    };
  }

  await cardRepository.deleteCard(user, cardId);
  return;
}
