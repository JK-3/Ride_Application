import RideRepository from "../repositories/RideRepository.js";
import * as vehicleRepo from "../repositories/VehicleRepository.js";

const rideRepo = new RideRepository();

export const getRequestedRides = async () => {
  return rideRepo.findRequestedRides();
};

export const acceptRide = async (rideid, driverid, vehicleid) => {
  if (!rideid || !driverid || !vehicleid) {
    throw new Error("rideid, driverid and vehicleid are required");
  }

  const ride = await rideRepo.findRideById(rideid);

  if (!ride || ride.status !== "requested") {
    throw new Error("Ride not available");
  }

  const vehicle = await vehicleRepo.getVehicleById(vehicleid, driverid);
  if (!vehicle) {
    throw new Error("Invalid vehicle for this driver");
  }


  const activeDriverRide = await rideRepo.findActiveRideByDriver(driverid);
  if (activeDriverRide) {
    throw new Error("Driver already has an active ride");
  }


  const activeVehicleRide = await rideRepo.findActiveRideByVehicle(vehicleid);
  if (activeVehicleRide) {
    throw new Error("Vehicle is already assigned to another ride");
  }

  
  return rideRepo.updateRide(ride, {
    status: "accepted",
    driverid,
    vehicleid,
  });
};

export const startRide = async (rideid, driverid) => {
  if (!rideid || !driverid) throw new Error("rideid and driverid required");

  const ride = await rideRepo.findRideById(rideid);
  if (!ride || ride.driverid !== driverid || ride.status !== "accepted") {
    throw new Error("Ride cannot be started");
  }
  return rideRepo.updateRide(ride, { status: "start", starttime: new Date() });
};

export const completeRide = async (rideid, driverid) => {
  if (!rideid || !driverid) throw new Error("rideid and driverid required");

  const ride = await rideRepo.findRideById(rideid);
  if (!ride || ride.driverid !== driverid || ride.status !== "start") {
    throw new Error("Ride cannot be completed");
  }
  return rideRepo.updateRide(ride, { status: "completed", endtime: new Date() });
};

export const cancelRide = async (rideid, driverid) => {
  if (!rideid || !driverid) throw new Error("rideid and driverid required");

  const ride = await rideRepo.findRideById(rideid);

  if (!ride || ride.driverid !== driverid) {
    throw new Error("Ride cannot be cancelled");
  }

  if (ride.status === "completed") {
    throw new Error("Completed rides cannot be cancelled");
  }

  return rideRepo.updateRide(ride, { status: "cancelled" });
};

export const getDriverRides = async (driverid) => {
  if (!driverid) throw new Error("driverid required");
  return rideRepo.findRidesByDriver(driverid);
};
