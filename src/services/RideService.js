import RideRepository from "../repositories/RideRepository.js";
const rideRepository = new RideRepository();

export default class RideService {
  async requestRide(rideData) {
    
    const ride = await rideRepository.insertRide({
        ...rideData,
        
        status: "requested"
    });
    console.log(ride);
    

    return { data: ride, message: "Ride requested successfully" };
}

  
  async cancelRide(rideid, riderId) {
    const ride = await rideRepository.findRideById(rideid);
    if (!ride) throw new Error("Ride not found");
    if (ride.riderid !== riderId) throw new Error("Unauthorized access");
    if (["completed", "cancelled"].includes(ride.status)) {
      throw new Error(`Cannot cancel a ${ride.status} ride`);
    }

    const updatedRide = await rideRepository.updateRide(rideid, { status: "cancelled" });
    return { data: updatedRide, message: "Ride cancelled successfully" };
  }

 
  async getRideHistory(riderId) {
    const rides = await rideRepository.findRidesByStatus(riderId, ["completed", "cancelled"]);
    return { data: rides };
  }
 
  async getMyRides(riderId) {
    const rides = await rideRepository.findRidesByRider(riderId);
    return { data: rides };
  }
 
  async getRideById(rideid, riderId) {
    const ride = await rideRepository.findRideById(rideid);
    if (!ride) throw new Error("Ride not found");
    if (ride.riderid !== riderId) throw new Error("Unauthorized access");
    return { data: ride };
  }

 
  async getActiveRide(riderId) {
    const ride = await rideRepository.findActiveRideByRider(riderId);
    return { data: ride || null };
  }
}
