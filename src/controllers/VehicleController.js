import {
  createVehicle,
  getVehicleById,
  getVehiclesByDriver,
  updateVehicle as updateVehicleRepo,
  deleteVehicle as deleteVehicleRepo
} from "../repositories/VehicleRepository.js";
import * as vehicleService from "../services/VehicleService.js";



export const registerVehicle = async (req, res, next) => {
  try {
    const driverid = req.userDetails.id;
    const vehicle = await vehicleService.registerVehicle(driverid, req.body);
    req.responseData = { status: 201, data: vehicle };
    next();
  } catch (err) {
    req.responseData = { status: 500, error: err.message };
    next();
  }
};

export const getMyVehicles = async (req, res, next) => {
  try {
    const driverid = req.userDetails.id;
    const vehicles = await vehicleService.listVehicles(driverid);
    req.responseData = { status: 200, data: vehicles };
    next();
  } catch (err) {
    req.responseData = { status: 500, error: err.message };
    next();
  }
};

export const updateVehicle = async (req, res, next) => {
  try {
    const driverid = req.userDetails.id;
    const { id: vehicleid } = req.params;

    const updated = await vehicleService.modifyVehicle(driverid, vehicleid, req.body);
    req.responseData = { status: 200, data: updated };
    next();
  } catch (err) {
    if (err.message === "Vehicle not found") {
      req.responseData = { status: 404, error: err.message };
    } else {
      req.responseData = { status: 500, error: err.message };
    }
    next();
  }
};

export const deleteVehicle = async (req, res, next) => {
  try {
    const driverid = req.userDetails.id;
    const { id: vehicleid } = req.params;

    await vehicleService.removeVehicle(driverid, vehicleid);
    req.responseData = { status: 200, data: { message: "Vehicle deleted successfully" } };
    next();
  } catch (err) {
    if (err.message === "Vehicle not found") {
      req.responseData = { status: 404, error: err.message };
    } else {
      req.responseData = { status: 500, error: err.message };
    }
    next();
  }
};
