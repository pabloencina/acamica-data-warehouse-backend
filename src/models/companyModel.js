import { Schema, model } from "mongoose";

export const companiesSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    city: {
      type: Schema.Types.ObjectId,
      ref: "Cities",
      required: true,
    },
    done: Boolean,
  },
  {
    timestamps: true,
  }
);

export default model("Companies", companiesSchema);
