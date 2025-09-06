import * as rideService from "../services/DriverRideService.js";

export default class DriverRideController {
  async viewRequestedRides(req, res, next) {
    try {
      const rides = await rideService.getRequestedRides();
      req.responseData = { status: 200, data: rides };
      next();
    } catch (err) {
      req.responseData = { status: 500, error: err.message };
      next();
    }
  }

  async acceptRide(req, res, next) {
    try {
      const { rideid, vehicleid } = req.body;
      const driverid = req.userDetails?.id;
      if (!rideid || !vehicleid) {
        req.responseData = { status: 400, error: "rideid and vehicleid are required" };
        return next();
      }
      const ride = await rideService.acceptRide(rideid, driverid, vehicleid);
      req.responseData = { status: 200, data: ride };
      next();
    } catch (err) {
      req.responseData = { status: 400, error: err.message };
      next();
    }
  }

  async startRide(req, res, next) {
    try {
      const { rideid } = req.body;
      const driverid = req.userDetails?.id;
      if (!rideid) {
        req.responseData = { status: 400, error: "rideid is required" };
        return next();
      }
      const ride = await rideService.startRide(rideid, driverid);
      req.responseData = { status: 200, data: ride };
      next();
    } catch (err) {
      req.responseData = { status: 400, error: err.message };
      next();
    }
  }

  async completeRide(req, res, next) {
    try {
      const { rideid } = req.body;
      const driverid = req.userDetails?.id;
      if (!rideid) {
        req.responseData = { status: 400, error: "rideid is required" };
        return next();
      }
      const ride = await rideService.completeRide(rideid, driverid);
      req.responseData = { status: 200, data: ride };
      next();
    } catch (err) {
      req.responseData = { status: 400, error: err.message };
      next();
    }
  }

  async cancelRide(req, res, next) {
    try {
      const { rideid } = req.body;
      const driverid = req.userDetails?.id;
      if (!rideid) {
        req.responseData = { status: 400, error: "rideid is required" };
        return next();
      }
      const ride = await rideService.cancelRide(rideid, driverid);
      req.responseData = { status: 200, data: ride };
      next();
    } catch (err) {
      req.responseData = { status: 400, error: err.message };
      next();
    }
  }

  async viewMyRides(req, res, next) {
    try {
      const driverid = req.userDetails?.id;
      if (!driverid) {
        req.responseData = { status: 401, error: "Unauthorized" };
        return next();
      }
      const rides = await rideService.getDriverRides(driverid);
      req.responseData = { status: 200, data: rides };
      next();
    } catch (err) {
      req.responseData = { status: 500, error: err.message };
      next();
    }
  }
}
