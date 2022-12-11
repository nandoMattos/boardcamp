import { Router } from "express";
import {
  getCategories,
  postCategory,
} from "../controllers/categoriesController.js";
import categoryBodyValidationMiddleware from "../middlewares/categoryValidation/categoryBodyValidationMiddleware.js";
import categoryExistsValidationMiddleware from "../middlewares/categoryValidation/categoryExistsValidationMiddleware.js";

const router = Router();

router.get("/categories", getCategories);
router.post(
  "/categories",
  categoryBodyValidationMiddleware,
  categoryExistsValidationMiddleware,
  postCategory
);

export default router;
