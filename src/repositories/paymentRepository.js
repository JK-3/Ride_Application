import Payment from "../models/mongo/Payments.js";

export default class PaymentRepository {
  async createPayment(paymentData) {
    const payment = new Payment(paymentData);
    return await payment.save();
  }

  async findPaymentById(paymentid) {
    return await Payment.findOne({ paymentid });
  }

  async findPaymentByRideId(rideid) {
    return await Payment.findOne({ rideid });
  }

  async updatePayment(paymentid, updates) {
    return await Payment.findOneAndUpdate(
      { paymentid },
      { $set: updates },
      { new: true }
    );
  }

  async getPaymentWithDetails(paymentid, ride) {
    const payment = await Payment.findOne({ paymentid }).lean();
    if (!payment) return null;

    return {
      ...payment,
      ride: ride ? ride.toJSON?.() || ride : null,
    };
  }
}
