import { Router } from "express";
import userRouter from "./UserRoute.js";
import driverRouter from "./DriverRoute.js";
import paymentRouter from "./paymentRoute.js";
import rideRouter from "./RideRoute.js";
const indexRouter = Router();

indexRouter.use('/users', userRouter);
indexRouter.use('/rider', rideRouter);
indexRouter.use("/driver", driverRouter);
indexRouter.use("/payment",paymentRouter);

export default indexRouter;


