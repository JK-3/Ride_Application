import express from "express";
import UserController from '../controllers/UserController.js'
import { sendResponse } from "../middlewares/sendResponse.js";

const userController = new UserController(); 
const userRouter = express.Router();

userRouter.post('/register', userController.createUser, sendResponse);

export default userRouter;