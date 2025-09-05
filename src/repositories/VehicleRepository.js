import Vehicle from "../models/mysql/Vehicle.js";

// Create new vehicle
export const createVehicle = async (data) => {
  return await Vehicle.create(data);
};

// Get a vehicle by ID 
export const getVehicleById = async (vehicleid, driverid) => {
  return await Vehicle.findOne({
    where: { vehicleid, driverid }
  });
};

// Get all vehicles for a driver
export const getVehiclesByDriver = async (driverid) => {
  return await Vehicle.findAll({
    where: { driverid }
  });
};

// Update a vehicle 
export const updateVehicle = async (vehicle, updates) => {
  return await vehicle.update(updates);
};

// Delete a vehicle
export const deleteVehicle = async (vehicleid, driverid) => {
  return await Vehicle.destroy({
    where: { vehicleid, driverid }
  });
};
