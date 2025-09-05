import express from "express";
import { createPayment, completePayment, getPayment } from "../controllers/paymentController.js";

const paymentRouter = express.Router();


paymentRouter.post("/payments", createPayment);


paymentRouter.put("/payments/:id/complete", completePayment);


paymentRouter.get("/payments/:id", getPayment);

export default paymentRouter;
