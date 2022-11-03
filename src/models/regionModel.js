import { Schema, model } from "mongoose";

export const regionsSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    countries: [
      {
        type: Schema.Types.ObjectId,
        ref: "Countries",
      },
    ],
    done: Boolean,
  },
  {
    timestamps: true,
  }
);

export default model("Regions", regionsSchema);
