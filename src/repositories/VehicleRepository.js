// janhawi
import { Vehicle } from "../models/index.js";

class VehicleRepository {
  async insertVehicle(vehicleData) {
    return Vehicle.create(vehicleData);
  }

  async findVehicleById(vehicleid) {

    return Vehicle.findByPk(vehicleid);
  }


  async getVehicleById(vehicleid, driverid = null) {
    if (!vehicleid) return null;
    const vehicle = await this.findVehicleById(vehicleid);
    if (!vehicle) return null;
    if (driverid && String(vehicle.driverid) !== String(driverid)) return null;
    return vehicle;
  }

  async findVehiclesByDriver(driverid) {
  return Vehicle.findAll({
    where: { driverid },
    order: [["vehicleid", "DESC"]]   
  });
}


  async updateVehicle(vehicleOrId, updates) {
    if (!vehicleOrId) return null;

    if (typeof vehicleOrId === "object" && typeof vehicleOrId.update === "function") {
      return vehicleOrId.update(updates);
    }

    const vehicle = await this.findVehicleById(vehicleOrId);
    if (!vehicle) return null;
    return vehicle.update(updates);
  }

  async deleteVehicle(vehicleid) {
    const vehicle = await this.findVehicleById(vehicleid);
    if (!vehicle) return null;
    await vehicle.destroy();
    return true;
  }
}


const repo = new VehicleRepository();


export default VehicleRepository;
export const getVehicleById = (...args) => repo.getVehicleById(...args);
export const insertVehicle = (...args) => repo.insertVehicle(...args);
export const findVehiclesByDriver = (...args) => repo.findVehiclesByDriver(...args);
export const updateVehicle = (...args) => repo.updateVehicle(...args);
export const deleteVehicle = (...args) => repo.deleteVehicle(...args);
