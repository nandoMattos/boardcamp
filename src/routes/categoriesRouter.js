import { Router } from "express";
import {
  getCategories,
  postCategory,
} from "../controllers/categoriesController.js";
import categoryValidationMiddleware from "../middlewares/categoryValidationMiddleware.js";

const router = Router();

router.get("/categories", getCategories);
router.post("/categories", categoryValidationMiddleware, postCategory);

export default router;
