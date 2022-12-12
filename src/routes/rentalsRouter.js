import { Router } from "express";
import { postRental } from "../controllers/rentalsController.js";
import customerIdExistsValidationMiddleware from "../middlewares/rentalValidation/customerIdExistsValidationMiddleware.js";
import gameIdExistsValidationMiddleware from "../middlewares/rentalValidation/gameIdExistsValidationMiddleware.js";
import getPriceGameMiddleware from "../middlewares/rentalValidation/getPriceGameMiddleware.js";
import rentalBodyValidationMiddleware from "../middlewares/rentalValidation/rentalBodyValidationMiddleware.js";

const router = Router();

router.get("/rentals", getRentals);

router.post(
  "/rentals",
  rentalBodyValidationMiddleware,
  customerIdExistsValidationMiddleware,
  gameIdExistsValidationMiddleware,
  //gameIsAvailableValidationMiddleware,
  getPriceGameMiddleware,
  postRental
);

export default router;
