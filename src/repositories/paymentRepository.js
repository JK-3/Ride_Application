import Payment from "../models/mongo/payments.js";

export const createPayment = async (paymentData) => {
  const payment = new Payment(paymentData);
  return await payment.save();
};


export const findPaymentById = async (paymentid) => {
  return await Payment.findOne({ paymentid });
};


export const findPaymentByRideId = async (rideid) => {
  return await Payment.findOne({ rideid });
};


export const updatePayment = async (paymentid, updates) => {
  return await Payment.findOneAndUpdate(
    { paymentid },
    { $set: updates },
    { new: true } 
  );
};


export const getPaymentWithDetails = async (paymentid, ride) => {
  const payment = await Payment.findOne({ paymentid }).lean();
  if (!payment) return null;

  return {
    ...payment,
    ride: ride ? ride.toJSON?.() || ride : null,
  };
};
