import { Schema, model } from "mongoose";

export const countriesSchema = new Schema(
    {
      name: {
        type: String,
        required: true,
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
  
  export default model("Countries", countriesSchema);

  