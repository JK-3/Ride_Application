import express from "express";
import { sendResponse } from "../middlewares/sendResponse.js";
import authenticateUser from "../middlewares/auth/authenticateUser.js";

import DriverRideController from "../controllers/DriverRideController.js";
import VehicleController from "../controllers/VehicleController.js";

const driverRouter = express.Router();


const driverController = new DriverRideController();
const vehicleController = new VehicleController();


driverRouter.use(authenticateUser);


driverRouter.post("/vehicles", vehicleController.registerVehicle.bind(vehicleController), sendResponse);
driverRouter.get("/vehicles", vehicleController.getMyVehicles.bind(vehicleController), sendResponse);
driverRouter.put("/vehicles/:id", vehicleController.updateVehicle.bind(vehicleController), sendResponse);
driverRouter.delete("/vehicles/:id", vehicleController.deleteVehicle.bind(vehicleController), sendResponse);


driverRouter.get("/rides/requested", driverController.viewRequestedRides.bind(driverController), sendResponse);
driverRouter.post("/rides/accept", driverController.acceptRide.bind(driverController), sendResponse);
driverRouter.post("/rides/start", driverController.startRide.bind(driverController), sendResponse);
driverRouter.post("/rides/complete", driverController.completeRide.bind(driverController), sendResponse);
driverRouter.post("/rides/cancel", driverController.cancelRide.bind(driverController), sendResponse);
driverRouter.get("/rides/my", driverController.viewMyRides.bind(driverController), sendResponse);

export default driverRouter;
