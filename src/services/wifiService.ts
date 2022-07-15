import Cryptr from "cryptr";

import { CreateWifiData } from "../repositories/wifiRepository.js";
import { UserTokenInfo } from "../repositories/authRepository.js";
import * as wifiRepository from "../repositories/wifiRepository.js";

const cryptr = new Cryptr(process.env.CRYPTR_KEY);

export async function createWifi(
  user: UserTokenInfo,
  wifiData: CreateWifiData
) {
  const wifi = await wifiRepository.checkTitle(user, wifiData.title);

  if (wifi) {
    throw {
      type: "conflict",
      message: `Wifi title already in use!`,
    };
  }

  const encryptPassword = cryptr.encrypt(wifiData.password);
  wifiData.password = encryptPassword;

  await wifiRepository.insert(user, wifiData);
}

export async function getWifi(user: UserTokenInfo, wifiId: number) {
  const wifi = await checkIfWifiExists(user, wifiId);

  const decryptedPassword = cryptr.decrypt(wifi.password);
  wifi.password = decryptedPassword;

  return wifi;
}

export async function getAllWifis(user: UserTokenInfo) {
  const wifis = await wifiRepository.getAll(user);

  wifis.forEach((wifi) => {
    const decryptedString = cryptr.decrypt(wifi.password);
    wifi.password = decryptedString;
  });

  return wifis;
}

export async function deleteWifi(user: UserTokenInfo, wifiId: number) {
  await checkIfWifiExists(user, wifiId);
  await wifiRepository.deleteWifi(user, wifiId);
}

async function checkIfWifiExists(user: UserTokenInfo, wifiId: number) {
  const wifi = await wifiRepository.getOne(user, wifiId);

  if (!wifi) {
    throw {
      type: "not_found",
      message: `Wifi not found!`,
    };
  }

  return wifi;
}
