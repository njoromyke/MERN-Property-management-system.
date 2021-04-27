import mongoose from "mongoose";

const propertySchema = mongoose.Schema(
  {
    givenName: {
      type: String,
      required: true,
      lowercase: true,
    },
    landlord: {
      type: String,
      required: true,
      ref: "LandLord",
    },
    tenant: {
      type: String,
      required: true,
      ref: "Tenant",
    },

    deposit: {
      type: Number,
      required: true,
      default: 0,
    },
    type: {
      required: true,
      type: String,
    },
    rent: {
      required: true,
      type: Number,
      default: 0,
    },
    county: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    isOccupied: {
      type: Boolean,
      required: true,
      default: false,
    },

    numRooms: {
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
const Property = mongoose.model("Property", propertySchema);
export default Property;
