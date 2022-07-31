import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { config } from "./config";
import puppyRoutes from "./routes/puppies";

const app = express();

mongoose
  .connect(config.mongo.url)
  .then(() => {
    console.log("Connected to DB!");
    startServer();
  })
  .catch((error) => {
    console.log(error);
  });

const startServer = () => {
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(cors());

  app.use("/api", puppyRoutes);

  app.listen(4000, () => {
    console.log("Server Started!");
  });
};
