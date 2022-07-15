import { Router } from "express";
import { tokenValidator } from "../middlewares/tokenValidator.js";
import schemaValidator from "../middlewares/schemaValidator.js";
import {
  createWifi,
  getWifi,
  deleteWifi,
} from "../controllers/wifiController.js";
import { wifiSchema } from "../schemas/wifiSchema.js";

const wifiRouter = Router();

wifiRouter.use(tokenValidator);

wifiRouter.post("/wifi", schemaValidator(wifiSchema), createWifi);
wifiRouter.get("/wifi", getWifi);
wifiRouter.delete("/wifi/:id", deleteWifi);

export default wifiRouter;
