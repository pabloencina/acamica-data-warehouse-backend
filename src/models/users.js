import { Schema, model } from "mongoose";

export const usersSchema = new Schema(
    {
      name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
      },
      surname: {
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
      password: {
        type: String,
        required: true,
        unique: true,
        trim: true,
      },
      profile: {
        type: Object,
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
  
  export default model("Users", usersSchema);

