import * as rideService from "../services/DriverRideService.js";

export const viewRequestedRides = async (req, res, next) => {
  try {
    const rides = await rideService.getRequestedRides();
    req.responseData = { status: 200, data: rides };
    next();
  } catch (err) {
    req.responseData = { status: 500, error: err.message };
    next();
  }
};

export const acceptRide = async (req, res, next) => {
  try {
    const { rideid, vehicleid } = req.body;
    const driverid = req.user.id;
    const ride = await rideService.acceptRide(rideid, driverid, vehicleid);
    req.responseData = { status: 200, data: ride };
    next();
  } catch (err) {
    req.responseData = { status: 400, error: err.message };
    next();
  }
};

export const startRide = async (req, res, next) => {
  try {
    const { rideid } = req.body;
    const driverid = req.user.id;
    const ride = await rideService.startRide(rideid, driverid);
    req.responseData = { status: 200, data: ride };
    next();
  } catch (err) {
    req.responseData = { status: 400, error: err.message };
    next();
  }
};

export const completeRide = async (req, res, next) => {
  try {
    const { rideid } = req.body;
    const driverid = req.user.id;
    const ride = await rideService.completeRide(rideid, driverid);
    req.responseData = { status: 200, data: ride };
    next();
  } catch (err) {
    req.responseData = { status: 400, error: err.message };
    next();
  }
};

export const cancelRide = async (req, res, next) => {
  try {
    const { rideid } = req.body;
    const driverid = req.user.id;
    const ride = await rideService.cancelRide(rideid, driverid);
    req.responseData = { status: 200, data: ride };
    next();
  } catch (err) {
    req.responseData = { status: 400, error: err.message };
    next();
  }
};

export const viewMyRides = async (req, res, next) => {
  try {
    const driverid = req.user.id;
    const rides = await rideService.getDriverRides(driverid);
    req.responseData = { status: 200, data: rides };
    next();
  } catch (err) {
    req.responseData = { status: 500, error: err.message };
    next();
  }
};
