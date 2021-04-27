import express from "express";
import { protect, admin } from "../middleware/authMiddleware.js";
import {
  deleteProperty,
  getProperty,
  getPropertyById,
  registerProperty,
  updateProperty,
} from "../controllers/propertyController.js";
const router = express.Router();

router.route("/").post(protect, registerProperty).get(protect, getProperty);
router
  .route("/:id")
  .get(protect, getPropertyById)
  .put(protect, updateProperty)
  .delete(protect, deleteProperty);

export default router;
