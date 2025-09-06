import { v4 as uuidv4 } from "uuid";
import RideRepository from "../repositories/RideRepository.js";
import * as paymentRepo from "../repositories/paymentRepository.js";
const rideRepo=new RideRepository();

export const createPaymentService = async (rideid) => {
  const ride = await rideRepo.findRideById(rideid);
  if (!ride) throw new Error("Ride not found");

  if (ride.status !== "completed") {
    throw new Error("Payment not allowed until ride is completed");
  }

  const existing = await paymentRepo.findPaymentByRideId(rideid);
  if (existing) throw new Error("Payment already exists for this ride");

  const paymentid = uuidv4();
  const payment = await paymentRepo.createPayment({
    paymentid,
    rideid: rideid,
    fare: ride.fare,
    status: "pending",
  });

  await rideRepo.updateRide(ride, { paymentid });

  return payment;

};


export const completePaymentService = async (paymentid, method) => {
  if (!method) throw new Error("Payment method is required");

  const payment = await paymentRepo.findPaymentById(paymentid);
  if (!payment) throw new Error("Payment not found");

  if (payment.status === "completed") {
    return { message: "Payment already completed", payment };
  }

  try {
    const updated = await paymentRepo.updatePayment(paymentid, {
      method,
      status: "completed",
    });
    return { message: "Payment completed successfully", payment: updated };
  } catch (err) {
    await paymentRepo.updatePayment(paymentid, { status: "failed" });
    throw new Error("Payment failed to complete");
  }
};


export const getPaymentService = async (paymentid) => {
  const payment = await paymentRepo.findPaymentById(paymentid);
  if (!payment) return null;

  const ride = await rideRepo.findRideById(payment.rideid);
  return await paymentRepo.getPaymentWithDetails(paymentid, ride);
};
