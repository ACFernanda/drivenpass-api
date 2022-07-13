import { Router } from "express";
import { tokenValidator } from "../middlewares/tokenValidator.js";

const wifiRouter = Router();

wifiRouter.use(tokenValidator);

export default wifiRouter;
