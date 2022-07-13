import { Router } from "express";

import authRouter from "./authRouter.js";
import cardsRouter from "./cardsRouter.js";
import credentialsRouter from "./credentialsRouter.js";
import notesRouter from "./notesRouter.js";

const router = Router();

router.use(authRouter);
router.use(cardsRouter);
router.use(credentialsRouter);
router.use(notesRouter);

export default router;
