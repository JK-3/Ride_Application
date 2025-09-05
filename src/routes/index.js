import { Router } from "express";
import userRouter from "./UserRoute.js";

const indexRouter = Router();

indexRouter.use('/users', userRouter);

export default indexRouter;


