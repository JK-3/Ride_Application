// sanjana
import express from "express";
import RatingController from "../controllers/RatingController.js";
import RideAuthentication from "../middlewares/auth/riderAuth.js";
import authenticateUser from "../middlewares/auth/authenticateUser.js";


const ratingRouter = express.Router();
const ratingController = new RatingController();

ratingRouter.post("/ratings", authenticateUser,RideAuthentication,(req, res) => ratingController.createRating(req, res));
ratingRouter.get("/ratings/:id", authenticateUser,RideAuthentication, (req, res) => ratingController.getRating(req, res));

export default ratingRouter;
