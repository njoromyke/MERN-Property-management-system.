import AsyncHandler from "express-async-handler";
import User from "../models/User.js";
import Tenant from "../models/Tenant.js";

//@desc register tenant
//@method POST /api/tenant/register
//protection private

const registerTenant = AsyncHandler(async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    phoneNumber,
    idNumber,
    emergencyPhoneNumber,
    emergencyName,
    occupation,
    roomAssigned,
  } = req.body;
  const existTenant = await Tenant.findOne({ phoneNumber });
  if (existTenant) {
    res.status(400);
    throw new Error("Tenant already exists");
  } else {
    const tenant = await Tenant.create({
      occupation,
      firstName,
      lastName,
      email,
      phoneNumber,
      idNumber,
      emergencyPhoneNumber,
      emergencyName,
      roomAssigned,
    });
    res.status(201).json(tenant);
  }
});

//@desc update tenant
//@method POST /api/tenant/:id
//protection private
const updateTenant = AsyncHandler(async (req, res) => {
  const tenant = await Tenant.findById(req.params.id);
  if (tenant) {
    tenant.firstName = req.body.firstName || tenant.firstName;
    tenant.lastName = req.body.lastName || tenant.lastName;
    tenant.occupation = req.body.firstName || tenant.firstName;
    tenant.email = req.body.email || tenant.email;
    tenant.phoneNumber = req.body.phoneNumber || tenant.phoneNumber;
    tenant.idNumber = req.body.idNumber || tenant.idNumber;
    tenant.emergencyName = req.body.emergencyName || tenant.emergencyName;
    tenant.roomAssigned = req.body.roomAssigned || tenant.roomAssigned;
    const updatedTenant = await tenant.save();
    res.json({
      _id: updatedTenant._id,
      occupation: updatedTenant.occupation,
      firstName: updatedTenant.firstName,
      lastName: updatedTenant.lastName,
      email: updatedTenant.email,
      phoneNumber: updatedTenant.phoneNumber,
      idNumber: updatedTenant.idNumber,
      emergencyPhoneNumber: updatedTenant.emergencyPhoneNumber,
      emergencyName: updatedTenant.emergencyName,
      roomAssigned: updatedTenant.roomAssigned,
    });
  } else {
    res.status(401);
    throw new Error("No tenant found");
  }
});

//@desc get all tenants
//@method POST /api/tenant
//protection private
const getTenants = AsyncHandler(async (req, res) => {
  const tenants = await Tenant.find({});
  res.json(tenants);
});

// //@desc getTenantby id
// //@method POST /api/tenant/:id
// //protection private

const getTenantById = AsyncHandler(async (req, res) => {
  const tenant = await Tenant.findById(req.params.id);
  if (tenant) {
    return res.json(tenant);
  } else {
    throw new Error("No tenant found");
  }
});

//@desc delete tenant
//@method dlete /api/tenant/:id
//protection private
const deleteTenant = AsyncHandler(async (req, res) => {
  const tenant = await Tenant.findById(req.params.id);
  if (tenant) {
    await tenant.remove();
    res.json({ msg: "Tenant removed" });
  } else {
    res.status(404);
    throw new Error("Tenant not found");
  }
});

export {
  registerTenant,
  updateTenant,
  getTenants,
  deleteTenant,
  getTenantById,
};
