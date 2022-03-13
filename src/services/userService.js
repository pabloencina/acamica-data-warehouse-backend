import usersModel from "../models/userModel";


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