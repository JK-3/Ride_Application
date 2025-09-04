import Rides from "../models/mysql/rides.js";

export const findRequestedRides = () => {
  return Rides.findAll({ where: { status: "requested" } });
};

export const findRideById = (rideid) => {
  return Rides.findByPk(rideid);
};

export const updateRide = (ride, updates) => {
  return ride.update(updates);
};

export const findRidesByDriver = (driverid) => {
  return Rides.findAll({
    where: { driverid },
    order: [["createdAt", "DESC"]], 
  });
};