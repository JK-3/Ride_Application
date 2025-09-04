import express from 'express';
import cookieParser from 'cookie-parser';
import indexRouter from './routes/index.js';
import paymentRoutes from "./routes/paymentRoute.js";

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use('/api', indexRouter);

app.use("/payments", paymentRoutes);

export default app;