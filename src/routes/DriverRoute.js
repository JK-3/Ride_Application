import express from "express";
import { sendResponse } from "../middlewares/sendResponse.js";
import authenticateUser from "../middlewares/auth/authenticateUser.js";

import {
  registerVehicle,
  updateVehicle,
  deleteVehicle,
  getMyVehicles
} from "../controllers/VehicleController.js";

import {
  viewRequestedRides,
  acceptRide,
  startRide,
  completeRide,
  cancelRide,
  viewMyRides
} from "../controllers/DriverRideController.js";

const driverRouter = express.Router();


driverRouter.use(authenticateUser);

 
driverRouter.post("/vehicles", registerVehicle, sendResponse);
driverRouter.get("/vehicles", getMyVehicles, sendResponse);
driverRouter.put("/vehicles/:id", updateVehicle, sendResponse);
driverRouter.delete("/vehicles/:id", deleteVehicle, sendResponse);
 
driverRouter.get("/rides/requested", viewRequestedRides, sendResponse);
driverRouter.post("/rides/accept", acceptRide, sendResponse);
driverRouter.post("/rides/start", startRide, sendResponse);
driverRouter.post("/rides/complete", completeRide, sendResponse);
driverRouter.post("/rides/cancel", cancelRide, sendResponse);
driverRouter.get("/rides/my", viewMyRides, sendResponse);

export default driverRouter;
