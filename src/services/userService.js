import { InvalidIdError } from "../errors/invalidIdError";
import usersModel from "../models/userModel";

const validator = require("validator");

export const findAllUser = async () => {
  try {
    const allUsers = await usersModel.find();
    return allUsers;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const createUser = async (user) => {
  try {
    const userToSave = new usersModel(user);

    const savedUser = await userToSave.save();

    return savedUser;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const findUserById = async (id) => {
  console.log(id);

  if (validator.isMongoId(id)) {
    try {
      const usersById = await usersModel.findOne({ _id: id });
      console.log(usersById);
      return usersById;
    } catch (error) {
      console.error(error);
      throw error;
    }
  } else {
    throw new InvalidIdError("The id is not valid");
  }
};

export const updateUser = async (user) => {
  try {
    const userToUpdate = new usersModel(user);

    const updatedUser = await userToUpdate.updateOne();

    return updatedUser;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
