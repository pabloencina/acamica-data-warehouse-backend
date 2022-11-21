import channelModel from "../models/channelModel.js";

export const findChannels = async () => {
  try {
    const allChannels = await channelModel.find();
    return allChannels;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
