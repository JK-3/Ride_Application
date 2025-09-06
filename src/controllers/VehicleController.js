import * as VehicleService from "../services/VehicleService.js";

export default class VehicleController {
  async registerVehicle(req, res, next) {
    try {
      const driverid = req.userDetails?.id;
      if (!driverid) {
        req.responseData = { status: 401, error: "Unauthorized" };
        return next();
      }

      const vehicleData = req.body || {};
      const created = await VehicleService.registerVehicle(driverid, vehicleData);
      req.responseData = { status: 201, data: created };
      next();
    } catch (error) {
      req.responseData = { status: 400, error: error.message };
      next();
    }
  }

  async getMyVehicles(req, res, next) {
    try {
      const driverid = req.userDetails?.id;
      if (!driverid) {
        req.responseData = { status: 401, error: "Unauthorized" };
        return next();
      }
      const vehicles = await VehicleService.listVehicles(driverid);
      req.responseData = { status: 200, data: vehicles };
      next();
    } catch (error) {
      req.responseData = { status: 500, error: error.message };
      next();
    }
  }

  async updateVehicle(req, res, next) {
    try {
      const vehicleid = req.params?.id;
      const driverid = req.userDetails?.id;
      const updates = req.body || {};

      if (!vehicleid) {
        req.responseData = { status: 400, error: "vehicle id is required in params" };
        return next();
      }

      const updated = await VehicleService.modifyVehicle(driverid, vehicleid, updates);
      req.responseData = { status: 200, data: updated };
      next();
    } catch (error) {
      req.responseData = { status: 400, error: error.message };
      next();
    }
  }

  async deleteVehicle(req, res, next) {
    try {
      const vehicleid = req.params?.id;
      const driverid = req.userDetails?.id;

      if (!vehicleid) {
        req.responseData = { status: 400, error: "vehicle id is required in params" };
        return next();
      }

      await VehicleService.removeVehicle(driverid, vehicleid);
      req.responseData = { status: 200, message: "Vehicle deleted successfully" };
      next();
    } catch (error) {
      req.responseData = { status: 400, error: error.message };
      next();
    }
  }
}
