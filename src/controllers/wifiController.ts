import { Request, Response } from "express";

import { CreateWifiData } from "../repositories/wifiRepository.js";
import { UserTokenInfo } from "../repositories/authRepository.js";
import * as wifiService from "../services/wifiService.js";

export async function createWifi(req: Request, res: Response) {
  const wifiData: CreateWifiData = req.body;
  const user: UserTokenInfo = res.locals.user;
  await wifiService.createWifi(user, wifiData);
  res.sendStatus(201);
}

export async function getWifi(req: Request, res: Response) {
  const wifiId = +req.query.id;
  const user: UserTokenInfo = res.locals.user;

  if (!wifiId) {
    const wifis = await wifiService.getAllWifis(user);
    return res.status(200).send(wifis);
  }

  const wifi = await wifiService.getWifi(user, wifiId);
  res.status(200).send(wifi);
}

export async function deleteWifi(req: Request, res: Response) {
  const wifiId = +req.params.id;
  const user: UserTokenInfo = res.locals.user;
  await wifiService.deleteWifi(user, wifiId);

  res.sendStatus(200);
}
