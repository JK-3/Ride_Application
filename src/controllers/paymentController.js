import { createPaymentService, getPaymentService } from "../services/paymentService.js";

export const createPayment = async (req, res) => {
  try {
    const payment = await createPaymentService(req.body);
    res.status(201).json(payment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getPayment = async (req, res) => {
  try {
    const payment = await getPaymentService(req.params.id);
    res.json(payment);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};
