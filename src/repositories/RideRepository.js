// repositories/RideRepository.js
import Rides from "../models/mysql/rides.js";
import { Op } from "sequelize";

class RideRepository {
  

async insertRide(rideData) {
    console.log(rideData)
    return await Rides.create(rideData);
}
  async findRideById(rideid) {
    return Rides.findByPk(rideid);
  }

   
  async updateRide(rideid, updates) {
    const ride = await this.findRideById(rideid);
    if (!ride) return null;
    return ride.update(updates);
  }
 
  async findRidesByRider(riderid) {
    return Rides.findAll({
      where: { riderid },
      order: [["createdAt", "DESC"]],
    });
  }

  
  async findRidesByStatus(riderid, statuses) {
    return Rides.findAll({
      where: {
        riderid,
        status: {
          [Op.in]: statuses,
        },
      },
      order: [["createdAt", "DESC"]],
    });
  }
 
  async findActiveRideByRider(riderid) {
    return Rides.findOne({
      where: {
        riderid,
        status: {
          [Op.in]: ["accepted", "start"],
        },
      },
      order: [["createdAt", "DESC"]],
    });
  }
 
  async findRidesByDriver(driverid) {
    return Rides.findAll({
      where: { driverid },
      order: [["createdAt", "DESC"]],
    });
  }

 
  async findActiveRideByDriver(driverid) {
    return Rides.findOne({
      where: {
        driverid,
        status: {
          [Op.in]: ["accepted", "start"],
        },
      },
    });
  }

 
  async findActiveRideByVehicle(vehicleid) {
    return Rides.findOne({
      where: {
        vehicleid,
        status: {
          [Op.in]: ["accepted", "start"],
        },
      },
    });
  }
}

export default RideRepository;
