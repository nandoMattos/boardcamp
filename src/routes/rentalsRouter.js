import { Router } from "express";
import { getRentals, postRental } from "../controllers/rentalsController.js";
import customerIdExistsValidationMiddleware from "../middlewares/rentalValidation/customerIdExistsValidationMiddleware.js";
import gameIdExistsValidationMiddleware from "../middlewares/rentalValidation/gameIdExistsValidationMiddleware.js";
import gameIsAvailableValidationMiddleware from "../middlewares/rentalValidation/gameIsAvailableValidationMiddleware.js";
import rentalBodyValidationMiddleware from "../middlewares/rentalValidation/rentalBodyValidationMiddleware.js";

const router = Router();

router.get("/rentals", getRentals);

router.post(
  "/rentals",
  rentalBodyValidationMiddleware,
  customerIdExistsValidationMiddleware,
  gameIdExistsValidationMiddleware,
  gameIsAvailableValidationMiddleware,
  postRental
);

export default router;
