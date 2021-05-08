import AsyncHandler from "express-async-handler";
import Rent from "../models/Room.js";

//@desc add rent
//@route POST /api/rents
//@access private
const addRent = AsyncHandler(async (req, res) => {
  const { apartment, amount, year, month, tenant, room, isPaid } = req.body;
  const rent = await Rent.create({
    apartment,
    amount,
    year,
    month,
    tenant,
    room,
    isPaid,
  });
  res.json(rooms);
});

//@desc get all rents
//@route GET /api/rents
//@access private
const getRents = AsyncHandler(async (req, res) => {
  const rents = await Rent.find({}).populate("aprtment").populate("tenant").populate("room");
  res.json(rents);
});

//@desc get  rent by id
//@route GET /api/rents
//@access private
const getRentById = AsyncHandler(async (req, res) => {
  const rent = await Rent.findById(req.params.id);
  if (!rent) {
    throw new Error("No selected rent found");
  } else {
    return res.json(rent);
  }
});
//@desc updateRent
//@route put /api/rent/:id
//@access private
const updateRent = AsyncHandler(async (req, res) => {
  const rent = await Rent.findById(req.params.id);
  if (rent) {
    rent.apartment = req.params.apartment || rent.apartment;
    rent.amount = req.params.amount || rent.amount;
    rent.year = req.params.year || rent.year;
    rent.month = req.params.month || rent.month;
    rent.tenant = req.params.tenant || rent.tenant;
    rent.room = req.params.room || rent.room;
    rent.isPaid = req.params.isPaid || rent.isPaid;
    const updatedRent = await rent.save();
    res.json({
      _id: updateRent._id,
      apartment: updateRent.apartment,
      amount: updateRent.amount,
      year: updateRent.year,
      month: updateRent.month,
      tenant: updateRent.tenant,
      room: updateRent.room,
      isPaid: updateRent.isPaid,
    });
  } else {
    res.status(500);
    throw new Error("No Rnet found");
  }
});
//@desc deleteRent
//@route delete /api/rent/:id
//@access private
const deleteRent = AsyncHandler(async (req, res) => {
  const rent = await Rent.findById(req.params.id);
  if (rent) {
    await rent.delete();
  } else {
    res.status(500);
    throw new Error("No rent found");
  }
});

export { addRent, getRents, getRentById, deleteRent, updateRent };
