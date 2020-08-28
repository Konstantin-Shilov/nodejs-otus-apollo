import express from 'express';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import errorHandler from './middleware/errorHandler';
import authRouter from './auth/authRoutes';

const app = express();

app.use(express.json());

app.use(helmet());

const limiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 300,
});
app.use(limiter);

app.get('/', (req, res) => {
  res.send({ status: 'UP' });
});

app.use(authRouter);
app.use(errorHandler);

export default app;
