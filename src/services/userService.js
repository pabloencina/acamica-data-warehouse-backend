import usersModel from "../models/userModel";


export const findAllUser = async () => {
  try {
    const allUsers = await usersModel.find();
    console.log(allUsers);
    return allUsers;
  } catch (error) {
    console.error(error);
    throw error;
  }
};


export const createUser = async (user) => {
  try {
    const userToSave = new usersModel(user);
    console.log(userToSave);
    // usersModel.validate(user);
    const savedUser = await userToSave.save();
    console.log(savedUser);
    return savedUser;
  } catch (error) {
    console.error(error);
    throw error;
  }
};