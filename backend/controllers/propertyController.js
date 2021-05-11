import AsyncHandler from "express-async-handler";
import User from "../models/User.js";
import Property from "../models/Property.js";

//@desc register property
//@method POST /api/property/register
//protection private
const registerProperty = AsyncHandler(async (req, res) => {
  const {
    givenName,
    landlord,
    deposit,
    type,
    rent,
    city,
    county,
    isOccupied,
    tenant,
    numRooms,
  } = req.body;
  const existProperty = await Property.findOne({ givenName });
  if (existProperty) {
    res.status(400);
    throw new Error("Property with the name already exists");
  } else {
    const property = await Property.create({
      givenName,
      landlord,
      deposit,
      type,
      rent,
      city,
      county,
      isOccupied,
      tenant,
      numRooms,
    });
    res.json(property);
  }
});

//@desc getall property
//@method POST /api/property/
//protection private
const getProperty = AsyncHandler(async (req, res) => {
  const property = await Property.find({})
    .populate("tenant","firstName lastName")
    .populate("landlord","fullName");
  res.json(property);
});

//@desc getPropertyById property
//@method POST /api/property/:id
//protection private
const getPropertyById = AsyncHandler(async (req, res) => {
  const property = await Property.findById(req.params.id);
  if (property) {
    res.json(property);
  } else {
    res.status(404);
    throw new Error("Property not found");
  }
});

//@desc delete property
//@method delete /api/property/:id
//protection private
const deleteProperty = AsyncHandler(async (req, res) => {
  const property = await Property.findById(req.params.id);
  if (property) {
    await property.remove();
  } else {
    res.status(404);
    throw new Error("Property not found");
  }
  res.json(property);
});

//@desc update property
//@method put /api/property/:id
//protection private
const updateProperty = AsyncHandler(async (req, res) => {
  const property = await Property.findById(req.params.id);
  if (property) {
    property.givenName = req.body.givenName || property.givenName;
    property.landlord = req.body.landlord || property.landlord;
    property.desposit = req.body.desposit || property.desposit;
    property.type = req.body.type || property.type;
    property.rent = req.body.rent || property.rent;
    property.city = req.body.city || property.city;
    property.county = req.body.county || property.county;
    property.isOccupied = req.body.isOccupied || property.isOccupied;
    property.numRooms = req.body.numRooms || property.numRooms;
    property.tenant = req.body.tenant || property.tenant;

    const updatedProperty =await property.save();
    res.json({
      _id: updatedProperty._id,
      givenName: updatedProperty.givenName,
      landlord: updatedProperty.landlord,
      deposit: updatedProperty.deposit,
      type: updatedProperty.type,
      rent: updatedProperty.rent,
      city: updatedProperty.city,
      county: updatedProperty.county,
      isOccupied: updatedProperty.isOccupied,
      numRooms: updatedProperty.numRooms,
      tenant: updatedProperty.tenant,
    });
  } else {
    res.status(404);
    throw new Error("Property not found");
  }
});

export {
  registerProperty,
  deleteProperty,
  getProperty,
  getPropertyById,
  updateProperty,
};
