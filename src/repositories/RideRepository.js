import { Rides} from "../models/index.js";
import { Op } from "sequelize";

class RideRepository {
  
async insertRide(rideData) {
  const activeRide = await Rides.findOne({
    where: {
      riderid: rideData.riderid,
      status: {
          [Op.in]: ["accepted", "start","requested"],
        },
    }
  });

  if (activeRide) {
    return {
      message: "You already have an active ride. Please complete or cancel it before booking a new one."
    };
  }

  console.log(rideData);
  
  return await Rides.create(rideData);
}

  async findRideById(rideid) {

    return Rides.findByPk(rideid);
  }

   
   async updateRide(rideOrId, updates) {
    if (!rideOrId) return null;

    
    if (typeof rideOrId === "object" && typeof rideOrId.update === "function") {
      return rideOrId.update(updates);
    }

   
    const ride = await this.findRideById(rideOrId);
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

   async findRequestedRides() {
    return Rides.findAll({
      where: { status: "requested" },
      order: [["createdAt", "DESC"]],
    });
  }
}

export default RideRepository;
