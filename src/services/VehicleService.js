import * as vehicleRepo from "../repositories/VehicleRepository.js";

export const registerVehicle = (driverid, data) => {
  return vehicleRepo.createVehicle({ ...data, driverid });
};

export const listVehicles = (driverid) => {
  return vehicleRepo.getVehiclesByDriver(driverid);
};

export const modifyVehicle = async (driverid, vehicleid, updates) => {
  const vehicle = await vehicleRepo.getVehicleById(vehicleid, driverid);
  if (!vehicle) throw new Error("Vehicle not found");
  return vehicleRepo.updateVehicle(vehicle, updates);
};

export const removeVehicle = async (driverid, vehicleid) => {
  const deleted = await vehicleRepo.deleteVehicle(vehicleid, driverid);
  if (!deleted) throw new Error("Vehicle not found");
  return true;
};
