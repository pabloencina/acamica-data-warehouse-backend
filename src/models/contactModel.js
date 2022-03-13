import { Schema, model } from "mongoose";

export const contactsSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    surname: {
      type: String,
      required: true,
      trim: true,
    },
    position: {
      type: String,
      required: true,
      trim: true,
    },
    companies: {
      type: Object,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    cities: {
      type: Object,
      required: true,
      trim: true,
    },
    done: Boolean,
  },
  {
    timestamps: true,
  }
);

export default model("Contacts", contactsSchema);
