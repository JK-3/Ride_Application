import { Router } from "express";
import userRouter from "./UserRoute.js";
import driverRouter from "./DriverRoute.js";
import paymentRouter from "./paymentRoute.js";

const indexRouter = Router();

indexRouter.use('/users', userRouter);
indexRouter.use("/driver", driverRouter);
indexRouter.use("/payment",paymentRouter);

export default indexRouter;


