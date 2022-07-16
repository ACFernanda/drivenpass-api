import prisma from "../config/db.js";
import { wifi } from "@prisma/client";
import { UserTokenInfo } from "./authRepository.js";

export type CreateWifiData = Omit<wifi, "id" | "userId">;

export async function insert(user: UserTokenInfo, wifiData: CreateWifiData) {
  await prisma.wifi.create({
    data: { ...wifiData, userId: user.id },
  });
}

export async function getOne(user: UserTokenInfo, wifiId: number) {
  const wifi = await prisma.wifi.findFirst({
    where: { userId: user.id, id: wifiId },
  });

  return wifi;
}

export async function getAll(user: UserTokenInfo) {
  const wifis = await prisma.wifi.findMany({
    where: { userId: user.id },
  });
  return wifis;
}

export async function deleteWifi(user: UserTokenInfo, wifiId: number) {
  await prisma.wifi.deleteMany({
    where: { userId: user.id, id: wifiId },
  });

  return;
}
