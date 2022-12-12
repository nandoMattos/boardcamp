import { Router } from "express";
import { getRentals, postRental } from "../controllers/rentalsController.js";
import customerIdExistsValidationMiddleware from "../middlewares/rentalValidation/customerIdExistsValidationMiddleware.js";
import gameIdExistsValidationMiddleware from "../middlewares/rentalValidation/gameIdExistsValidationMiddleware.js";
import gameIsAvailableValidationMiddleware from "../middlewares/rentalValidation/gameIsAvailableValidationMiddleware.js";
import getQueryRentalsMiddleware from "../middlewares/rentalValidation/getQueryRentalsMiddleware.js";
import rentalBodyValidationMiddleware from "../middlewares/rentalValidation/rentalBodyValidationMiddleware.js";
import rentalExistsValidationMiddleware from "../middlewares/rentalValidation/rentalExistsValidationMiddleware.js";

const router = Router();

router.get("/rentals", getQueryRentalsMiddleware, getRentals);

router.post(
  "/rentals",
  rentalBodyValidationMiddleware,
  customerIdExistsValidationMiddleware,
  gameIdExistsValidationMiddleware,
  gameIsAvailableValidationMiddleware,
  postRental
);

router.post("/rentals/:id/return", rentalExistsValidationMiddleware);

export default router;
