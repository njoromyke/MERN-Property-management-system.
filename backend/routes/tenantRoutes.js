import express from "express";
import { protect, admin } from "../middleware/authMiddleware.js";
import {
  getTenants,
  registerTenant,
  updateTenant,
  deleteTenant,
  getTenantById,
} from "../controllers/tenantController.js";
const router = express.Router();

router.route("/").post(protect, registerTenant).get(protect, getTenants);
router
  .route("/:id")
  .get(protect, getTenantById)
  .put(protect, updateTenant)
  .delete(protect, deleteTenant);

export default router;
