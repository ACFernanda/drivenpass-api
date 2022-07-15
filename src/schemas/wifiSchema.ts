import joi from "joi";
import { CreateWifiData } from "../repositories/wifiRepository.js";

export const wifiSchema = joi.object<CreateWifiData>({
  title: joi.string().required(),
  name: joi.string().required(),
  password: joi.string().required(),
});
