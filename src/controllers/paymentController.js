import * as paymentService from "../services/paymentService.js";

export const createPayment = async (req, res) => {
  try {
    const { rideid } = req.body;
    if (!rideid) {
      return res.status(400).json({ error: "rideid is required" });
    }

    const payment = await paymentService.createPaymentService(rideid);
    return res.status(201).json({ message: "Payment created successfully", payment });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const completePayment = async (req, res) => {
  try {
    const { id } = req.params; 
    const { method } = req.body;

    if (!method) {
      return res.status(400).json({ error: "Payment method is required" });
    }

    const result = await paymentService.completePaymentService(id, method);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const getPayment = async (req, res) => {
  try {
    const { id } = req.params;
    const payment = await paymentService.getPaymentService(id);

    if (!payment) {
      return res.status(404).json({ error: "Payment not found" });
    }

    return res.status(200).json(payment);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
