// janhawi
import express from "express";
import { sendResponse } from "../middlewares/sendResponse.js";
import driverAuth from "../middlewares/auth/driverAuth.js";

import DriverRideController from "../controllers/DriverRideController.js";
import VehicleController from "../controllers/VehicleController.js";
import authenticateUser from "../middlewares/auth/authenticateUser.js";

const driverRouter = express.Router();


const driverController = new DriverRideController();
const vehicleController = new VehicleController();


driverRouter.use(authenticateUser,driverAuth);


driverRouter.post("/vehicles",vehicleController.registerVehicle, sendResponse);
driverRouter.get("/vehicles", vehicleController.getMyVehicles, sendResponse);
driverRouter.put("/vehicles/:id", vehicleController.updateVehicle, sendResponse);
driverRouter.delete("/vehicles/:id", vehicleController.deleteVehicle, sendResponse);


driverRouter.get("/rides/requested", driverController.viewRequestedRides, sendResponse);
driverRouter.post("/rides/accept", driverController.acceptRide, sendResponse);
driverRouter.post("/rides/start", driverController.startRide, sendResponse);
driverRouter.post("/rides/complete", driverController.completeRide, sendResponse);
driverRouter.post("/rides/cancel", driverController.cancelRide, sendResponse);
driverRouter.get("/rides/my", driverController.viewMyRides, sendResponse);

export default driverRouter;
