import mongoose from "mongoose";

const roomSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    rent: {
      type: Number,
      required: true,
    },

    isOccupied: {
      type: Boolean,
      required: true,
      default: false,
    },
    parentApartment: {
      required: true,
      type: mongoose.Schema.Types.ObjectId,
      ref: "Property",
    },
    deposit: {
      type: Number,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
      default: Date.now(),
    },
    tenant: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Tenant",
    },
  },
  {
    timestamps: true,
  }
);
const Room = mongoose.model("Room", roomSchema);
export default Room;
