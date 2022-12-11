import { Router } from "express";
import { getGames, postGame } from "../controllers/gamesControllers.js";
import idCategoryExistsValidationMiddleware from "../middlewares/categoryValidation/idCategoryExistsValidationMiddleware.js";
import gameBodyValidationMiddleware from "../middlewares/gameValidation/gameBodyValidationMiddleware.js";
import gameExistsValidationMiddleware from "../middlewares/gameValidation/gameExistsValidationMiddleware.js";

const router = Router();

router.get("/games", getGames);
router.post(
  "/games",
  gameBodyValidationMiddleware,
  gameExistsValidationMiddleware,
  idCategoryExistsValidationMiddleware,
  postGame
);

export default router;
