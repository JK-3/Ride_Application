import { v4 as uuidv4 } from "uuid";
import RideRepository from "../repositories/RideRepository.js";
import PaymentRepository from "../repositories/PaymentRepository.js";

export default class PaymentService {
  constructor() {
    this.rideRepo = new RideRepository();
    this.paymentRepo = new PaymentRepository();
  }

  async createPayment(rideid) {
    const ride = await this.rideRepo.findRideById(rideid);
    if (!ride) throw new Error("Ride not found");

    if (ride.status !== "completed") {
      throw new Error("Payment not allowed until ride is completed");
    }

    const existing = await this.paymentRepo.findPaymentByRideId(rideid);
    if (existing) throw new Error("Payment already exists for this ride");

    const paymentid = uuidv4();
    const payment = await this.paymentRepo.createPayment({
      paymentid,
      rideid,
      fare: ride.fare,
      status: "pending",
    });

    await this.rideRepo.updateRide(ride, { paymentid });

    return payment;
  }

  async completePayment(paymentid, method) {
    if (!method) throw new Error("Payment method is required");

    const payment = await this.paymentRepo.findPaymentById(paymentid);
    if (!payment) throw new Error("Payment not found");

    if (payment.status === "completed") {
      return { message: "Payment already completed", payment };
    }

    try {
      const updated = await this.paymentRepo.updatePayment(paymentid, {
        method,
        status: "completed",
      });
      return { message: "Payment completed successfully", payment: updated };
    } catch (err) {
      await this.paymentRepo.updatePayment(paymentid, { status: "failed" });
      throw new Error("Payment failed to complete");
    }
  }

  async getPayment(paymentid) {
    const payment = await this.paymentRepo.findPaymentById(paymentid);
    if (!payment) return null;

    const ride = await this.rideRepo.findRideById(payment.rideid);
    return await this.paymentRepo.getPaymentWithDetails(paymentid, ride);
  }
}
