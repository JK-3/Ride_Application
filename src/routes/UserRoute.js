import express from "express";
import UserController from '../controllers/UserController.js'
import { sendResponse } from "../middlewares/sendResponse.js";
import authenticateUser from "../middlewares/auth/authenticateUser.js";
import driverRouter from "./DriverRoute.js";

const userController = new UserController(); 
const userRouter = express.Router();

userRouter.post('/register', userController.createUser, sendResponse);
userRouter.post('/login', userController.loginUser, sendResponse);
userRouter.post('/getme', authenticateUser, userController.getUserProfile, sendResponse);
userRouter.post('/update', authenticateUser, userController.updateUserProfile, sendResponse);
userRouter.post('/change-pass', authenticateUser, userController.changeUserPassword, sendResponse);


userRouter.use("/driver", driverRouter)

export default userRouter;