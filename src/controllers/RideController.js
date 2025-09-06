
import RideService from "../services/RideService.js";

const rideService = new RideService();

export default class RideController {



  async requestRide(req, res) {
    try {

        const riderId = req.userDetails?.id; 
        console.log(riderId)
        console.log(req.body)


        const { data, message } = await rideService.requestRide({
            ...req.body,
            riderid: riderId
        });

        return res.status(201).json({ success: true, message, data });
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
}


  
  async cancelRide(req, res) {
    try {
      const { rideid } = req.params;
      console.log(rideid)
      const riderId = req.userDetails?.id; 
      console.log(riderId)

      const { data, message } = await rideService.cancelRide(rideid, riderId);

      return res.status(200).json({ success: true, message, data });
    } catch (error) {
      return res.status(400).json({ success: false, message: error.message });
    }
  }


  async getRideHistory(req, res) {
    try {
      const riderId = req.userDetails?.id; 
      console.log(riderId)
      const { data } = await rideService.getRideHistory(riderId);

      return res.status(200).json({ success: true, data });
    } catch (error) {
      return res.status(400).json({ success: false, message: error.message });
    }
  }

  async getMyRides(req, res) {
    try {
     const riderId = req.userDetails?.id; 
      console.log(riderId)
      const { data } = await rideService.getMyRides(riderId);

      return res.status(200).json({ success: true, data });
    } catch (error) {
      return res.status(400).json({ success: false, message: error.message });
    }
  }


  async getRideById(req, res) {
    try {
      const { rideid } = req.params;
      const riderId = req.userDetails?.id; 
      console.log(riderId)

      const { data } = await rideService.getRideById(rideid, riderId);

      return res.status(200).json({ success: true, data });
    } catch (error) {
      return res.status(404).json({ success: false, message: error.message });
    }
  }

 
  async getActiveRide(req, res) {
    try {
      const riderId = req.userDetails?.id; 
      console.log(riderId)

      const { data } = await rideService.getActiveRide(riderId);

      return res.status(200).json({ success: true, data });
    } catch (error) {
      return res.status(400).json({ success: false, message: error.message });
    }
  }
}
