import { InvalidIdError } from "../errors/invalidIdError";
import contactModel from "../models/contactModel";

const validator = require("validator");

export const findAllContacts = async () => {
  try {
    const allContacts = await contactModel.find();
    console.log(allContacts);
    return allContacts;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
