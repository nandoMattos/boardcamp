import { Router } from "express";
import {
  getCustomers,
  getCustomersById,
  postCustomer,
  updateCustomer,
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
router.put(
  "/customers/:id",
  customerBodyValidationMiddleware,
  customerExistsValidationMiddeware,
  updateCustomer
);

export default router;
