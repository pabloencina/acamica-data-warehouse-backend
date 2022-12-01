import contactModel from "../models/contactModel.js";
import validator from "validator";
import { InvalidIdError } from "../errors/errors.js";

export const findAllContacts = async () => {
  try {
    const allContacts = await contactModel
      .find()
      .populate({
        path: "channels",
      })
      .populate({
        path: "city",
        populate: {
          path: "country",
          populate: {
            path: "region",
          },
        },
      })
      .populate("company");
    console.log(allContacts);
    return allContacts;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const findContactById = async (id) => {
  if (validator.isMongoId(id)) {
    try {
      const contactById = await contactModel.findOne({ _id: id });
      return contactById;
    } catch (error) {
      console.error(error);
      throw error;
    }
  } else {
    throw new InvalidIdError("The id is not valid");
  }
};

export const createContact = async (contact) => {
  try {
    const contactToSave = new contactModel(contact);
    const savedContact = await contactToSave.save();
    return savedContact;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateContactById = async (id, contact) => {
  const { name, surname, email, position, company, region, country, city, address, interest } =
    contact;
  try {
    await contactModel.updateOne(
      { _id: id },
      { name, surname, email, position, company, region, country, city, address, interest },
      { runValidators: true }
    );
    return await contactModel.findOne({ _id: id });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteContactById = async (id) => {
  try {
    const deletedContact = await contactModel.findOne({ _id: id });
    await contactModel.deleteOne({ _id: id });
    return deletedContact;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
