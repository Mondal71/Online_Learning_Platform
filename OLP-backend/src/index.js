import dotenv from "dotenv";
import connectDB from "./db/index.js"
// .env load
dotenv.config({
  path: "./.env",
});

connectDB();

