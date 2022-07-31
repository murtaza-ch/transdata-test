import dotenv from "dotenv";
dotenv.config();

const MONGO_URL = process.env.MONGO_URL;

export const config = {
  mongo: {
    url: MONGO_URL,
  },
};
