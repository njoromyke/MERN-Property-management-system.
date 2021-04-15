import express from "express";
import {
  registerUser,
  authUser,
  updateUserProfile,
  getUserProfile,
  deleteUser,
  getUserById,
  updateUser,
  getUsers,
} from "../controllers/usersController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").post(registerUser).get(protect, admin, getUsers);
router.post("/login", authUser);
router
  .route("/profile")
  .put(protect, updateUserProfile)
  .get(protect, getUserProfile);

router
  .route("/:id")
  .delete(protect, admin, deleteUser)
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUser);

export default router;
