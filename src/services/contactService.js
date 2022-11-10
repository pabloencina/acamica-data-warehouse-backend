import contactModel from "../models/contactModel";

export const findAllContacts = async () => {
  try {
    const allContacts = await contactModel
      .find()
      .populate({
        path: "channels",
        populate: {
          path: "channel",
        },
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
    return allContacts;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
