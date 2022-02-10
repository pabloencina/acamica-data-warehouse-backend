import { Schema, model } from "mongoose";

export const countriesSchema = new Schema(
    {
      name: {
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
  
  export default model("Countries", countriesSchema);

  