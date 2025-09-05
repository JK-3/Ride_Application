import { v4 as uuidv4 } from "uuid";
import { createPayment, getPaymentWithDetails } from "../repositories/paymentRepository.js";
import { sequelize } from "../config/mysql.js";

export const createPaymentService = async (data) => {
  // Validate ride
  const [ride] = await sequelize.query("SELECT * FROM rides WHERE id = ?", {
    replacements: [data.rideid],
  });
  if (ride.length === 0) throw new Error("Ride not found");

  // Validate rider
  const [rider] = await sequelize.query("SELECT * FROM riders WHERE id = ?", {
    replacements: [data.riderid],
  });
  if (rider.length === 0) throw new Error("Rider not found");

  // Validate driver
  const [driver] = await sequelize.query("SELECT * FROM drivers WHERE id = ?", {
    replacements: [data.driverid],
  });
  if (driver.length === 0) throw new Error("Driver not found");

  // Create payment in Mongo
  return await createPayment({
    paymentid: uuidv4(),
    ...data,
  });
};

export const getPaymentService = async (paymentId) => {
  return await getPaymentWithDetails(paymentId);
};
