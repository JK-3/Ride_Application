import Rating from "../models/mongo/Ratings.js";

export default class RatingRepository {
    async insertRating(ratingData) {
        const rating = new Rating(ratingData);
        return await rating.save();
    }

    async findById(ratingid) {
        return await Rating.findOne({ ratingid }).lean();
    }
}
