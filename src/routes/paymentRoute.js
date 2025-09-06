import express from "express";
import PaymentController from "../controllers/PaymentController.js";

const paymentRouter = express.Router();
const paymentController = new PaymentController();


paymentRouter.post("/payments", (req, res) => paymentController.createPayment(req, res));
paymentRouter.put("/payments/:id/complete", (req, res) => paymentController.completePayment(req, res));
paymentRouter.get("/payments/:id", (req, res) => paymentController.getPayment(req, res));

export default paymentRouter;
