// sanjana
import express from "express";
import PaymentController from "../controllers/PaymentController.js";
import RideAuthentication from "../middlewares/auth/riderAuth.js";
import authenticateUser from "../middlewares/auth/authenticateUser.js";

const paymentRouter = express.Router();
const paymentController = new PaymentController();


paymentRouter.post("/payments",authenticateUser,RideAuthentication, (req, res) => paymentController.createPayment(req, res));
paymentRouter.put("/payments/:id/complete", authenticateUser,RideAuthentication, (req, res) => paymentController.completePayment(req, res));
paymentRouter.get("/payments/:id",authenticateUser,RideAuthentication, (req, res) => paymentController.getPayment(req, res));

export default paymentRouter;
