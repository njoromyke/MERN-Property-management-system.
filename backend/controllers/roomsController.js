import AsyncHandler from "express-async-handler";
import Room from "../models/Room.js";
import Property from "../models/Property.js";

//@desc add room
//@route POST /api/rooms
//@access private
const addRoom = AsyncHandler(async (req, res) => {
  const {
    title,
    rent,
    isOccupied,
    deposit,
    startDate,
    parentApartment,
    tenant,
    type,
  } = req.body;
  const roomExist = await Room.findOne({ title });

  if (roomExist) {
    res.status(404);
    throw new Error("Room already exists");
  } else {
    const rooms = await Room.create({
      title,
      rent,
      isOccupied,
      deposit,
      startDate,
      parentApartment,
      tenant,
      type,
    });
    res.json(rooms);
  }
});

//@desc geet all rooms
//@route GET /api/rooms
//@access private

const getRooms = AsyncHandler(async (req, res) => {
  const rooms = await Room.find({})
    .populate("parentApartment", "givenName type")
    .populate("tenant", "firstName lastName");
  res.json(rooms);
});

//@desc getroom by id
//@route GET /api/rooms/:id
//@access private

const getRoomBId = AsyncHandler(async (req, res) => {
  const room = await Room.findById(req.params.id);
  if (room) {
    res.json(room);
  } else {
    res.status(500);
    throw new Error("No room found");
  }
});
//@desc getrooms by apartment id
//@route GET /api/rooms/parentApartment/:id
//@access private
const getRoomsbyApartment = AsyncHandler(async (req, res) => {
  const apartment = await Property.findById(req.params.id);
  const roomInApartment = await Room.find({})
    .where("parentApartment")
    .equals(apartment);

  if (roomInApartment) {
    return res.json(roomInApartment);
  } else {
    throw new Error("No room found");
  }
});
// //@desc getTenantbyRoomId
// //@method get /api/rooms/getRoom/:id
// //protection private
const getTenantbyRoomId = AsyncHandler(async (req, res) => {
  const room = await Room.findById(req.params.id);
  const rooms = await Room.find({})
    .where("_id")
    .equals(room)
    .populate("tenant", "firstName lastName");
  if (rooms) {
    return res.json(rooms);
  } else {
    throw new Error("No tenant found");
  }
});

//@desc updateroom
//@route GET /api/rooms/:id
//@access private

const updateRoom = AsyncHandler(async (req, res) => {
  const room = await Room.findById(req.params.id);
  if (room) {
    room.title = req.body.title || room.title;
    room.rent = req.body.rent || room.rent;
    room.isOccupied = req.body.isOccupied || room.isOccupied;
    room.parentApartment = req.body.parentApartment || room.parentApartment;
    room.tenant = req.body.tenant || room.tenant;
    room.deposit = req.body.deposit || room.deposit;
    room.startDate = req.body.startDate || room.startDate;
    room.type = req.body.type || room.type;
    const updatedRoom = room.save();
    res.json({
      _id: updatedRoom._id,
      title: updatedRoom.title,
      rent: updatedRoom.rent,
      isOccupied: updatedRoom.isOccupied,
      tenant: updatedRoom.tenant,
      startDate: updatedRoom.startDate,
      parentApartment: updatedRoom.parentApartment,
      deposit: updatedRoom.deposit,
      type: updatedRoom.type,
    });
  } else {
    res.status(500);
    throw new Error("No room found");
  }
});

//@desc delete room
//@route delete /api/rooms/:id
//@access private
const deleteRoom = AsyncHandler(async (req, res) => {
  const room = await Room.findById(req.params.id);
  if (room) {
    await room.remove();
  } else {
    res.status(500);
    throw new Error("No room found");
  }
});
export {
  deleteRoom,
  updateRoom,
  getRoomBId,
  getRooms,
  addRoom,
  getRoomsbyApartment,
  getTenantbyRoomId,
};
