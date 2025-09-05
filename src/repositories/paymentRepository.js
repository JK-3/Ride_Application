import Payment from "../models/mongo/payments.js";
// import * as rideRepo from "./rideRepository.js";

// Create new payment
export const createPayment = async (paymentData) => {
  const payment = new Payment(paymentData);
  return await payment.save();
};

// Find payment by paymentid (UUID)
export const findPaymentById = async (paymentid) => {
  return await Payment.findOne({ paymentid });
};

// Find payment by rideid (to enforce one payment per ride)
export const findPaymentByRideId = async (rideid) => {
  return await Payment.findOne({ rideid });
};

// Update payment by paymentid
export const updatePayment = async (paymentid, updates) => {
  return await Payment.findOneAndUpdate(
    { paymentid },
    { $set: updates },
    { new: true } // return updated document
  );
};

// Get payment with ride details
export const getPaymentWithDetails = async (paymentid, ride) => {
  const payment = await Payment.findOne({ paymentid }).lean();
  if (!payment) return null;

  return {
    ...payment,
    ride: ride ? ride.toJSON?.() || ride : null,
  };
};
