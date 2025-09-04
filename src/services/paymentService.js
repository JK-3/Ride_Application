import { v4 as uuidv4 } from "uuid";
import { createPayment, getPaymentWithDetails } from "../repositories/paymentRepository.js";
import mysqlPool from "../config/mysql.js";

export const createPaymentService = async (data) => {
  // Validate ride, rider, driver in MySQL
  const [ride] = await mysqlPool.query("SELECT * FROM rides WHERE id = ?", [data.rideid]);
  if (ride.length === 0) throw new Error("Ride not found");

  const [rider] = await mysqlPool.query("SELECT * FROM riders WHERE id = ?", [data.riderid]);
  if (rider.length === 0) throw new Error("Rider not found");

  const [driver] = await mysqlPool.query("SELECT * FROM drivers WHERE id = ?", [data.driverid]);
  if (driver.length === 0) throw new Error("Driver not found");

  // Create payment with UUID
  return await createPayment({
    paymentid: uuidv4(),
    ...data
  });
};

export const getPaymentService = async (paymentId) => {
  return await getPaymentWithDetails(paymentId);
};
