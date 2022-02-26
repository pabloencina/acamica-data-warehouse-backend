import usersModel from "../models/userModel";
//import "../database"

export const findAllUser = async () => {
  try {
    const allUsers = await usersModel.find();
    console.log(allUsers);
    return allUsers;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};
