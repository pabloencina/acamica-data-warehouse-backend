import { Schema, model } from "mongoose";

export const companiesSchema = new Schema(
    {
      name: {
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
      phone: {
        type: String,
        required: true,
        unique: true,
        trim: true,
      },
      adress: {
        type: String,
        required: true,
        unique: true,
        trim: true,
      },
      cities: {
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
  
  export default model("Companies", companiesSchema);

  