import express from "express";
import { protect, admin } from "../middleware/authMiddleware.js";
import {
  deleteLandlord,
  getLandlordById,
  getLandlords,
  registerLandlord,
  updateLandlord,
} from "../controllers/landlordController.js";
const router = express.Router();

router.route("/").post( protect,registerLandlord).get(protect, getLandlords);
router
  .route("/:id")
  .put(protect, updateLandlord)
  .delete(protect, deleteLandlord)
  .get(protect, getLandlordById);

export default router;
