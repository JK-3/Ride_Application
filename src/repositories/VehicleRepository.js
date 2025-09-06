import Vehicle from "../models/mysql/Vehicle.js";

export const createVehicle = async (data) => {
  return await Vehicle.create(data);
};

export const getVehicleById = async (vehicleid, driverid) => {
  return await Vehicle.findOne({
    where: { vehicleid, driverid }
  });
};

export const getVehiclesByDriver = async (driverid) => {
  return await Vehicle.findAll({
    where: { driverid }
  });
};

 export const updateVehicle = async (vehicle, updates) => {
  return await vehicle.update(updates);
};

 export const deleteVehicle = async (vehicleid, driverid) => {
  return await Vehicle.destroy({
    where: { vehicleid, driverid }
  });
};
