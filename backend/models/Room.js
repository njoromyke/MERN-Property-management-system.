import mongoose from "mongoose";

const roomSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    rent: {
      type: Number,
      required: true,
      default: 0,
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
      unique: false,
    },
    deposit: {
      type: Number,
      required: true,
      default: 0,
    },
    startDate: {
      type: Date,
      required: true,
      default: () => Date.now(),
    },
    tenant: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Tenant",
      sparse: true,
    },
    type: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const Room = mongoose.model("Room", roomSchema);
export default Room;
