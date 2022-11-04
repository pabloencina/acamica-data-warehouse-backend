import { Schema, model } from "mongoose";

export const channelsSchema = new Schema(
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

export default model("Channels", channelsSchema);
