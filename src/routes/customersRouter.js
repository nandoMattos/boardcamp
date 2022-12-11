import { Router } from "express";
import {
  getCustomers,
  getCustomersById,
  postCustomer,
} from "../controllers/customersController.js";
import customerBodyValidationMiddleware from "../middlewares/customerValidation/customerBodyValidationMiddleware.js";
import customerExistsValidationMiddeware from "../middlewares/customerValidation/customerExistsValidationMiddeware.js";

const router = Router();

router.get("/customers", getCustomers);
router.get("/customers/:id", getCustomersById);
router.post(
  "/customers",
  customerBodyValidationMiddleware,
  customerExistsValidationMiddeware,
  postCustomer
);

export default router;
