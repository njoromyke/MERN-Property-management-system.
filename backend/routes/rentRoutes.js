import express from "express";
import {
  addRent,
  deleteRent,
  getRentById,
  getRents,
  updateRent,
} from "../controllers/rentController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").post(protect, addRent).get(protect, getRents);
router
  .route(":/id")
  .get(protect, getRentById)
  .delete(protect, deleteRent)
  .put(protect, updateRent);

export default router;
