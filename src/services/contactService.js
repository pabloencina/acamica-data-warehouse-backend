import contactModel from "../models/contactModel.js";

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
