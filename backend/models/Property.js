import mongoose from "mongoose";

const propertySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    landlord: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },

    deposit: {
      type: Number,
      required: true,
    },
    type: {
      required: true,
      type: String,
    },
    rent: {
      required: true,
      type: Number,
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
    tenant: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Tenant",
    },
    numRooms: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const Property = mongoose.model("Property", propertySchema);
export default Property;
