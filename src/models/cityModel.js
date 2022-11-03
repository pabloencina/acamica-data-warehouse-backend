import { Schema, model } from "mongoose";

export const citiesSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    done: Boolean,
  },
  {
    timestamps: true,
  }
);

export default model("Cities", citiesSchema);
