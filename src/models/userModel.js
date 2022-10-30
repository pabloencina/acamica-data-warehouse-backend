import { Schema, model } from "mongoose";

const usersSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: "20",
      minlength: "3",
    },
    surname: {
      type: String,
      required: true,
      trim: true,
      maxlength: "25",
      minlength: "2",
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      maxlength: "40",
      minlength: "10",
    },
    password: {
      type: String,
      required: true,
      trim: true,
      // select: false,
      maxlength: "36",
      minlength: "8",
    },
    profile: {
      type: String,
      enum: ["ADMIN", "BASIC"],
      required: true,
      trim: true,
    },
    done: Boolean,
  },
  {
    timestamps: true,
  },
  { versionKey: false }
);

export default model("Users", usersSchema);

