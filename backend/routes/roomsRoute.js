import express from "express";
import { admin, protect } from "../middleware/authMiddleware.js";
import {
  addRoom,
  deleteRoom,
  getRoomBId,
  getRooms,
  updateRoom,
  getRoomsbyApartment,
  getTenantbyRoomId,
} from "../controllers/roomsController.js";

const router = express.Router();

router.route("/").get(protect, getRooms).post(protect, addRoom);
router
  .route("/:id")
  .put(protect, updateRoom)
  .delete(protect, deleteRoom)
  .get(protect, getRoomBId);
router.route("/parentApartment/:id").get(protect, getRoomsbyApartment);
router.route("/getRoom/:id").get(protect, getTenantbyRoomId);
export default router;
