import validator from "validator";
import {
  AlreadyInDbError,
  InvalidIdError,
  NotFoundError,
  ValidationFailedError,
} from "../errors/errors.js";
import cityModel from "../models/cityModel.js";
import companyModel from "../models/companyModel.js";
import contactModel from "../models/contactModel.js";
import { formatValidationErrors } from "../utils/errorFormater.js";

export const findAllContacts = async () => {
  try {
    const allContacts = await contactModel
      .find()
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
    return allContacts;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const findContactById = async (id) => {
  if (validator.isMongoId(id)) {
    try {
      const contactById = await contactModel
        .findOne({ _id: id })
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
  if (!validator.isMongoId(contact.city)) {
    throw new InvalidIdError("The id of city is not valid");
  }

  if (!validator.isMongoId(contact.company)) {
    throw new InvalidIdError("The id of company is not valid");
  }

  try {
    const cityById = await cityModel.findOne({ _id: contact.city });

    if (!cityById) {
      throw new NotFoundError("City not found.");
    }

    const companyById = await companyModel.findOne({ _id: contact.company });
    if (!companyById) {
      throw new NotFoundError("Company not found.");
    }

    const contactToSave = new contactModel(contact);
    const savedContact = await contactToSave.save();
    return savedContact;
  } catch (error) {
    console.error(error);
    if (error.code && error.code === 11000) {
      throw new AlreadyInDbError(Object.keys(error.keyPattern)[0] + " is already in DB.");
    } else if (error._message && error._message === "Contacts validation failed") {
      const errors = formatValidationErrors(error);
      throw new ValidationFailedError("Validation failed", errors);
    }
    throw error;
  }
};

// try {
//   const contactToSave = new contactModel(contact);
//   const savedContact = await contactToSave.save();
//   return savedContact;
// } catch (error) {
//   console.error(error);
//   throw error;
// }

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
