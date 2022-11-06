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

export const findUserById = async (id) => {
  if (validator.isMongoId(id)) {
    try {
      const usersById = await usersModel.findOne({ _id: id });
      return usersById;
    } catch (error) {
      console.error(error);
      throw error;
    }
  } else {
    throw new InvalidIdError("The id is not valid");
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

export const updateUserById = async (id, user) => {
  const { name, surname, profile, password, email } = user;
  try {
    await usersModel.updateOne(
      { _id: id },
      { name, surname, profile, password, email }
    );

    return await usersModel.findOne({ _id: id });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteUserById = async (id) => {
  try {
    const deletedUser = await usersModel.findOne({ _id: id });
     const respDelete = await usersModel.deleteOne({ _id: id });
    return deletedUser
  } catch (error) {
    console.error(error);
    throw error;
  }
};
