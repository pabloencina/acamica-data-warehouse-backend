import { findChannels } from "../services/channelService.js";

export const getChannels = async (request, response) => {
  try {
    let channels = await findChannels();
    response.status(200).json(channels);
  } catch (error) {
    response.status(500).json({
      message: "Internal Server Error",
      error: "Internal Server Error",
    });
  }
};
