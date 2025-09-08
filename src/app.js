// dhaval
import express from 'express';
import cookieParser from 'cookie-parser';
import indexRouter from './routes/index.js';

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use('/api', indexRouter);

export default app;