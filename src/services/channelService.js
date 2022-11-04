import { InvalidIdError } from "../errors/invalidIdError";
import channelModel from "../models/channelModel";

const validator = require("validator");

export const findChannels = async () => {
  try {
    const allChannels = await channelModel.find();
    console.log(allChannels);
    return allChannels;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
