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
    const driverid = req.user.id;
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
    const driverid = req.user.id;
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
    const driverid = req.user.id;
    const { id: vehicleid } = req.params;

    const vehicle = await getVehicleById(vehicleid, driverid);
    if (!vehicle) {
      req.responseData = { status: 404, error: "Vehicle not found" };
      return next();
    }

    const updated = await updateVehicleRepo(vehicle, req.body);
    req.responseData = { status: 200, data: updated };
    next();
  } catch (err) {
    req.responseData = { status: 500, error: err.message };
    next();
  }
};

export const deleteVehicle = async (req, res, next) => {
  try {
    const driverid = req.user.id;
    const { id: vehicleid } = req.params;

    const deleted = await deleteVehicleRepo(vehicleid, driverid);
    if (!deleted) {
      req.responseData = { status: 404, error: "Vehicle not found" };
      return next();
    }

    req.responseData = { status: 200, data: { message: "Vehicle deleted successfully" } };
    next();
  } catch (err) {
    req.responseData = { status: 500, error: err.message };
    next();
  }
};
