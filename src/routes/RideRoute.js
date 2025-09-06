import express from "express";
import RideController from "../controllers/RideController.js";
import authenticateUser from "../middlewares/auth/authenticateUser.js";
import { sendResponse } from "../middlewares/sendResponse.js";
import RideAuthentication from "../middlewares/auth/riderAuth.js";
const rideController = new RideController();
const rideRouter = express.Router();



rideRouter.post("/book", authenticateUser,RideAuthentication, rideController.requestRide, sendResponse);

rideRouter.patch("/:rideid/cancel", authenticateUser,RideAuthentication, rideController.cancelRide, sendResponse);

rideRouter.get("/my-rides/history", authenticateUser,RideAuthentication, rideController.getRideHistory, sendResponse);

rideRouter.get("/my-rides", authenticateUser,RideAuthentication, rideController.getMyRides, sendResponse);

rideRouter.get("/:rideid", authenticateUser,RideAuthentication, rideController.getRideById, sendResponse);

rideRouter.get("/my-rides/active", authenticateUser,RideAuthentication, rideController.getActiveRide, sendResponse);

export default rideRouter;
