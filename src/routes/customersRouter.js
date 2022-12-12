import { Router } from "express";
import {
  getCustomers,
  getCustomersById,
  postCustomer,
  updateCustomer,
} from "../controllers/customersController.js";
import customerBodyValidationMiddleware from "../middlewares/customerValidation/customerBodyValidationMiddleware.js";
import customerCpfExistsValidationMiddeware from "../middlewares/customerValidation/customerCpfExistsValidationMiddeware.js";

const router = Router();

router.get("/customers", getCustomers);
router.get("/customers/:id", getCustomersById);
router.post(
  "/customers",
  customerBodyValidationMiddleware,
  customerCpfExistsValidationMiddeware,
  postCustomer
);
router.put(
  "/customers/:id",
  customerBodyValidationMiddleware,
  customerCpfExistsValidationMiddeware,
  updateCustomer
);

export default router;
