import express from "express";
import { createPayment, completePayment, getPayment } from "../controllers/paymentController.js";

const paymentRouter = express.Router();

// POST /api/users/payments → create payment
paymentRouter.post("/payments", createPayment);

// PUT /api/users/payments/:id/complete → complete payment
paymentRouter.put("/payments/:id/complete", completePayment);

// GET /api/users/payments/:id → get payment details
paymentRouter.get("/payments/:id", getPayment);

export default paymentRouter;
