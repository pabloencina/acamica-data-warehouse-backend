import { Schema, model } from "mongoose";

export const citiesSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    country: {
      type: Schema.Types.ObjectId,
      ref: "Countries",
      required: true,
    },
    done: Boolean,
  },
  {
    timestamps: true,
  }
);

export default model("Cities", citiesSchema);
