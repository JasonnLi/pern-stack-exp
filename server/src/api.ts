import express from "express";
import { UserController } from "./Routes/authRoute"

const api = express.Router();

const userController = new UserController();

api.get("/", async (req, res) => {
  res.send("Welcome to the Mongoose & TypeScript example");
});

userController.mount(api)

export default api;
