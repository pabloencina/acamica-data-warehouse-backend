import { Schema, model } from "mongoose";

const contactChannelSchema = new Schema({
  channel: {
    type: Schema.Types.ObjectId,
    ref: "Channels",
  },
  account: {
    type: String,
    required: true,
    trim: true,
  },
  preference: {
    type: String,
    enum: ["NO_PREFERENCE", "FAVORITE_CHANNEL", "DO_NOT_DISTURB"],
    required: true,
    trim: true,
  },
});

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
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    position: {
      type: String,
      required: true,
      trim: true,
    },
    company: {
      type: Schema.Types.ObjectId,
      ref: "Companies",
      required: true,
    },
    city: {
      type: Schema.Types.ObjectId,
      ref: "Cities",
      required: true,
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    channels: [
      {
        type: contactChannelSchema,
      },
    ],
    interest: {
      type: Number,
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

export default model("Contacts", contactsSchema);
