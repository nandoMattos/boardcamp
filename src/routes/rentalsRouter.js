import { Router } from "express";
import {
  deleteRental,
  getRentals,
  postRental,
  postRentalReturn,
} from "../controllers/rentalsController.js";
import customerIdExistsValidationMiddleware from "../middlewares/rentalValidation/customerIdExistsValidationMiddleware.js";
import gameIdExistsValidationMiddleware from "../middlewares/rentalValidation/gameIdExistsValidationMiddleware.js";
import gameIsAvailableValidationMiddleware from "../middlewares/rentalValidation/gameIsAvailableValidationMiddleware.js";
import getQueryRentalsMiddleware from "../middlewares/rentalValidation/getQueryRentalsMiddleware.js";
import rentalBodyValidationMiddleware from "../middlewares/rentalValidation/rentalBodyValidationMiddleware.js";
import rentalClosedValidationMiddleware from "../middlewares/rentalValidation/rentalClosedValidationMiddleware.js";
import rentalExistsValidationMiddleware from "../middlewares/rentalValidation/rentalExistsValidationMiddleware.js";
import rentalIsLateValidationMiddleware from "../middlewares/rentalValidation/rentalIsLateValidationMiddleware.js";
import rentalIsntClosedValidationMiddleware from "../middlewares/rentalValidation/rentalIsntClosedValidationMiddleware.js";

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

router.post(
  "/rentals/:id/return",
  rentalExistsValidationMiddleware,
  rentalClosedValidationMiddleware,
  rentalIsLateValidationMiddleware,
  postRentalReturn
);

router.delete(
  "/rentals/:id",
  rentalExistsValidationMiddleware,
  rentalIsntClosedValidationMiddleware,
  deleteRental
);

export default router;
