import { Router } from "express";
import userRouter from "./UserRoute.js";
import driverRouter from "./DriverRoute.js";

const indexRouter = Router();

indexRouter.use('/users', userRouter);
indexRouter.use("/driver", driverRouter);

export default indexRouter;

