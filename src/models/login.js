import { Schema, model } from "mongoose";
//import { mongoose } from "mongoose";

export const loginSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
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

export default model("Login", loginSchema);
