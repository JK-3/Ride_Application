import * as rideRepo from "../repositories/RideRepository.js";
import * as vehicleRepo from "../repositories/VehicleRepository.js";


export const getRequestedRides = async () => {
  return rideRepo.findRequestedRides();
};

export const acceptRide = async (rideid, driverid, vehicleid) => {
  const ride = await rideRepo.findRideById(rideid);

  if (!ride || ride.status !== "requested") {
    throw new Error("Ride not available");
  }

  const vehicle = await vehicleRepo.getVehicleById(vehicleid, driverid);
  if (!vehicle) {
    throw new Error("Invalid vehicle for this driver");
  }

  return rideRepo.updateRide(ride, { 
    status: "accepted", 
    driverid, 
    vehicleid 
  });
};

export const startRide = async (rideid, driverid) => {
  const ride = await rideRepo.findRideById(rideid);
  if (!ride || ride.driverid !== driverid || ride.status !== "accepted") {
    throw new Error("Ride cannot be started");
  }
  return rideRepo.updateRide(ride, { status: "start", starttime: new Date() });
};

export const completeRide = async (rideid, driverid) => {
  const ride = await rideRepo.findRideById(rideid);
  if (!ride || ride.driverid !== driverid || ride.status !== "start") {
    throw new Error("Ride cannot be completed");
  }
  return rideRepo.updateRide(ride, { status: "completed", endtime: new Date() });
};

export const cancelRide = async (rideid, driverid) => {
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
  return rideRepo.findRidesByDriver(driverid);
};