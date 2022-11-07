import { Schema, model } from "mongoose";

export const countriesSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    cities: [
      {
        type: Schema.Types.ObjectId,
        ref: "Cities",
      },
    ],
    region: {
      type: Schema.Types.ObjectId,
      ref: "Regions",
      required: true,
    },
    done: Boolean,
  },
  {
    timestamps: true,
  }
);

export default model("Countries", countriesSchema);
