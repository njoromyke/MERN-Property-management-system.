import mongoose from "mongoose";

const tenantSchema = mongoose.Schema(
  {
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
    agreementDoc: {
      required: true,
      type: String,
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
