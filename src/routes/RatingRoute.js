import express from "express";
import RatingController from "../controllers/RatingController.js";

const ratingRouter = express.Router();
const ratingController = new RatingController();

ratingRouter.post("/ratings", (req, res) => ratingController.createRating(req, res));
ratingRouter.get("/ratings/:id", (req, res) => ratingController.getRating(req, res));

export default ratingRouter;
