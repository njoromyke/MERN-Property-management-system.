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
      default: Date.now(),
    },
    year: {
      type: Date,
      required: true,
      default: Date.now(),
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
    ref: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);

const Rent = mongoose.model("Rent", rentSchema);
export default Rent;
