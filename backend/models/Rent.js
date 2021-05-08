import mongoose from "mongoose";
const rentSchema = mongoose.Schema(
  {
    apartment: {
      type: String,
      required: true,
      ref: "Property",
    },
    month: {
      type: Date,
      required: true,
      default: Date.now(new Date.getMonth()),
    },
    year: {
      type: Date,
      required: true,
      default: Date.now(new Date.getFullYear()),
    },
    isPaid: {
      type: Boolean,
      required: true,
      default: false,
    },
    tenant: {
      type: String,
      required: true,
      ref: "Tenant",
    },
    room: {
      type: String,
      ref: "Room",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Rent = mongoose.model("Rent", rentSchema);
export default Rent;
