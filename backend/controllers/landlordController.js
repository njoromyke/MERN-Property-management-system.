import User from "../models/User.js";
import AsyncHandler from "express-async-handler";
import LandLord from "../models/Landlord.js";
import Tenant from "../models/Tenant.js";

//@desc add landlord
//@route POST /api/landlords/register
//@access private

const registerLandlord = AsyncHandler(async (req, res) => {
  const { fullName, email, idNumber, phoneNumber } = req.body;
  const existsLandlord = await LandLord.findOne({ email });
  const existsidNumer = await LandLord.findOne({ idNumber });
  if (existsLandlord || existsidNumer) {
    res.status(400);
    throw new Error("Landlord already exists");
  }
  const landlord = await LandLord.create({
    fullName,
    email,
    idNumber,
    phoneNumber,
  });
  if (landlord) {
    res.status(201).json({
      landlord,
    });
  }
});

//@desc get all landlords
//@route get /api/landlords
//@access private

const getLandlords = AsyncHandler(async (req, res) => {
  const landlords = await LandLord.find({});
  res.json(landlords);
});

//@desc getbyId landlords
//@route get /api/:id
//@access private

const getLandlordById = AsyncHandler(async (req, res) => {
  const landlord = await LandLord.findById(req.params.id);
  if (!landlord) {
    res.status(401).json("No Landlord found");
  } else {
    res.json(landlord);
  }
});

//@desc delete landlord
//@route delete /api/:id
//@access private

const deleteLandlord = AsyncHandler(async (req, res) => {
  const landlord = await LandLord.findById(req.params.id);
  if (landlord) {
    await landlord.remove();
    return res.json({ msg: "Landlord removed" });
  } else {
    return res.status(401).json("No landlord found");
  }
});

//@desc getbyId landlords
//@route get /api/:id
//@access private

const updateLandlord = AsyncHandler(async (req, res) => {
  const landlord = await LandLord.findById(req.params.id);

  if (landlord) {
    landlord.fullName = req.body.fullName || landlord.fullName;
    landlord.email = req.body.email || landlord.email;
    landlord.idNumber = req.body.idNumber || landlord.idNumber;
    landlord.phoneNumber = req.body.phoneNumber || landlord.phoneNumber;

    const updatedLandlord = await landlord.save();
    res.json({
      _id: updatedLandlord._id,
      fullName: updatedLandlord.fullName,
      email: updatedLandlord.email,
      phoneNumber: updatedLandlord.phoneNumber,
      idNumber: updatedLandlord.idNumber,
    });
  } else {
    res.status(401);
    throw new Error("No landlord found");
  }
});

export {
  registerLandlord,
  deleteLandlord,
  updateLandlord,
  getLandlordById,
  getLandlords,
};
