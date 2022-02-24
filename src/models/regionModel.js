import { Schema, model } from "mongoose";

export const regionsSchema = new Schema(
    {
      name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
      },
      countries: {
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
  
  export default model("Regions", regionsSchema);

  