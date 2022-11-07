import contactModel from "../models/contactModel";

export const findAllContacts = async () => {
  try {
    const allContacts = await contactModel.find().populate({
      path: "channels",
      populate: {
        path: "channel",
      },
    });
    return allContacts;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
