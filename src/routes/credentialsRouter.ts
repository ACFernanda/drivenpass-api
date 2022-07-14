import { Router } from "express";
import { tokenValidator } from "../middlewares/tokenValidator.js";
import schemaValidator from "../middlewares/schemaValidator.js";
import {
  createCredential,
  getCredential,
  deleteCredential,
} from "../controllers/credentialsController.js";
import { credentialSchema } from "../schemas/credentialSchema.js";

const credentialsRouter = Router();

credentialsRouter.use(tokenValidator);

credentialsRouter.post(
  "/credentials",
  schemaValidator(credentialSchema),
  createCredential
);
credentialsRouter.get("/credentials", getCredential);
credentialsRouter.delete("/credentials/:id", deleteCredential);

export default credentialsRouter;
