import Payment from "../models/mongo/Payment.js";
import mysqlPool from "../config/mysql.js";

export const createPayment = async (data) => {
  const payment = new Payment(data);
  return await payment.save();
};

export const getPaymentWithDetails = async (paymentId) => {
  const payment = await Payment.findOne({ paymentid: paymentId });
  if (!payment) throw new Error("Payment not found");

  const [ride] = await mysqlPool.query("SELECT * FROM rides WHERE id = ?", [payment.rideid]);
  const [rider] = await mysqlPool.query("SELECT * FROM riders WHERE id = ?", [payment.riderid]);
  const [driver] = await mysqlPool.query("SELECT * FROM drivers WHERE id = ?", [payment.driverid]);

  return {
    paymentid: payment.paymentid,
    fare: payment.fare,
    method: payment.method,
    status: payment.status,
    timestamp: payment.timestamp,
    ride: ride[0] || null,
    rider: rider[0] || null,
    driver: driver[0] || null
  };
};
