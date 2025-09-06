import { v4 as uuidv4 } from "uuid";
import RatingRepository from "../repositories/RatingRepository.js";
import RideRepository from "../repositories/RideRepository.js";

const ratingRepository = new RatingRepository();
const rideRepository = new RideRepository();

export default class RatingService {
    async createRating({ rideid, stars, comment }) {
        const ride = await rideRepository.findById(rideid);
        if (!ride) throw new Error("Ride not found");

        if (ride.status !== "completed") {
            throw new Error("Rating can only be given after ride completion");
        }

        if (ride.ratingid) {
            throw new Error("Rating already exists for this ride");
        }

        const ratingid = uuidv4();
        const rating = await ratingRepository.insertRating({
            ratingid,
            rideid,
            stars,
            comment,
        });

        await rideRepository.updateRide(ride, { ratingid });

        return { data: rating, message: "Rating created successfully" };
    }

    async getRating(ratingid) {
        const rating = await ratingRepository.findById(ratingid);
        if (!rating) {
            return { data: null, message: "Rating not found" };
        }
        return { data: rating, message: "Rating fetched successfully" };
    }
}
