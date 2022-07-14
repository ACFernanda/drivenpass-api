import { Router } from "express";
import { tokenValidator } from "../middlewares/tokenValidator.js";
import {
  createCredential,
  getCredential,
  deleteCredential,
} from "../controllers/credentialsController.js";

const credentialsRouter = Router();

credentialsRouter.use(tokenValidator);

credentialsRouter.post("/credentials", createCredential);
credentialsRouter.get("/credentials", getCredential);
credentialsRouter.delete("/credentials/:id", deleteCredential);

export default credentialsRouter;
