// common
import { Router } from "express";
import userRouter from "./UserRoute.js";
import driverRouter from "./DriverRoute.js";
import paymentRouter from "./PaymentRoute.js";
import ratingRouter from "./RatingRoute.js";

import rideRouter from "./RideRoute.js";
const indexRouter = Router();

indexRouter.use('/users', userRouter);
indexRouter.use('/rider', rideRouter);
indexRouter.use("/driver", driverRouter);
indexRouter.use("/payment",paymentRouter);
indexRouter.use("/rating",ratingRouter);

export default indexRouter;


