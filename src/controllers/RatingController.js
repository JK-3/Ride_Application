import RatingService from "../services/RatingService.js";

const ratingService = new RatingService();

export default class RatingController {
    async createRating(req, res) {
        try {
            const { rideid, score, comment } = req.body;
            if (!rideid || !score) {
                return res.status(400).json({ error: "rideid and score are required" });
            }

            const response = await ratingService.createRating({ rideid, score, comment });
            return res.status(201).json(response);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

    async getRating(req, res) {
        try {
            const { id } = req.params;
            const response = await ratingService.getRating(id);
            if (!response.data) {
                return res.status(404).json({ error: response.message });
            }
            return res.status(200).json(response);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
}
