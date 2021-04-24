import mongoose from "mongoose";

const tenantSchema = mongoose.Schema(
  {
    ref: {
      type: String,
      default: "",
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: Number,
      required: true,
      unique: true,
    },
    idNumber: {
      type: Number,
      required: true,
    },
    occupation: {
      type: String,
      required: true,
    },

    emergencyName: {
      type: String,
      required: true,
    },
    emergencyPhoneNumber: {
      type: Number,
      required: true,
    },

    roomAssigned: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Room",
      minimize: false,
    },
  },
  {
    timestamps: true,
  }
);
const Tenant = mongoose.model("Tenant", tenantSchema);
export default Tenant;
