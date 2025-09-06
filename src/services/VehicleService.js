import * as vehicleRepo from "../repositories/VehicleRepository.js";
import RideRepository from "../repositories/RideRepository.js";

const rideRepo = new RideRepository();

export const registerVehicle = async (driverid, vehicleData) => {
  if (!driverid) throw new Error("driverid required");
  const payload = { ...vehicleData, driverid };
  return vehicleRepo.insertVehicle(payload);
};


export const listVehicles = async (driverid) => {
  if (!driverid) throw new Error("driverid required");
  return vehicleRepo.findVehiclesByDriver(driverid);
};


export const modifyVehicle = async (driverid, vehicleid, updates) => {
  if (!driverid || !vehicleid) throw new Error("driverid and vehicleid required");
  const vehicle = await vehicleRepo.getVehicleById(vehicleid, driverid);
  if (!vehicle) throw new Error("Vehicle not found for this driver");
  const updated = await vehicleRepo.updateVehicle(vehicle, updates);
  return updated;
};


export const removeVehicle = async (driverid, vehicleid) => {
  if (!driverid || !vehicleid) throw new Error("driverid and vehicleid required");

  const vehicle = await vehicleRepo.getVehicleById(vehicleid, driverid);
  if (!vehicle) throw new Error("Vehicle not found for this driver");


  const activeRide = await rideRepo.findActiveRideByVehicle(vehicleid);
  if (activeRide) {
    throw new Error("Vehicle currently assigned to an active ride");
  }

  await vehicleRepo.deleteVehicle(vehicleid);
  return true;
};
