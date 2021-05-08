import express from "express";
import { admin, protect } from "../middleware/authMiddleware.js";
import {
  addRoom,
  deleteRoom,
  getRoomBId,
  getRooms,
  updateRoom,
  getRoomsbyApartment,
} from "../controllers/roomsController.js";

const router = express.Router();

router.route("/").get(protect, getRooms).post(protect, addRoom);
router
  .route("/:id")
  .put(protect, updateRoom)
  .delete(protect, deleteRoom)
  .get(protect, getRoomBId);
router.route("/parentApartment/:id").get(protect, getRoomsbyApartment);
export default router;
