import { Schema, model } from "mongoose";


const profile = ["ADMIN", "BASIC"]

const usersSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      // Buscar la forma de definir max y min len para cada campo.
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
    password: {
      type: String,
      required: true,
      trim: true,
    },
    profile: {
      type: profile,
      required: true,
      trim: true,
      // VALIDAR LA PERTENENCIA EN BACKEND
      // BASIC, ADMIN
    },
    done: Boolean,
  },
  {
    timestamps: true,
  },
  { versionKey: false }
);

export default model("Users", usersSchema);
