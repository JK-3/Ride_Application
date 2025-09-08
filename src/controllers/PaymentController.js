// sanjana
import PaymentService from "../services/PaymentService.js";

const paymentService = new PaymentService();

export default class PaymentController {
  async createPayment(req, res) {
    try {
      const { rideid } = req.body;
      if (!rideid) {
        return res.status(400).json({ error: "rideid is required" });
      }

      const payment = await paymentService.createPayment(rideid);
      return res.status(201).json({ message: "Payment created successfully", payment });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async completePayment(req, res) {
    try {
      const { id } = req.params;
      const { method } = req.body;

      if (!method) {
        return res.status(400).json({ error: "Payment method is required" });
      }

      const result = await paymentService.completePayment(id, method);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async getPayment(req, res) {
    try {
      const { id } = req.params;
      const payment = await paymentService.getPayment(id);

      if (!payment) {
        return res.status(404).json({ error: "Payment not found" });
      }

      return res.status(200).json(payment);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}