import dotenv from "dotenv";
dotenv.config();

export const config = {
  port: process.env.PORT,
  mongo_url: process.env.MONGO_DB_URL,
  secret_key: process.env.SECRET_KEY,
};
