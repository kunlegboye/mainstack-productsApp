import express, { Request, Response, NextFunction } from 'express';
import createError from 'http-errors';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import logger from 'morgan';
import authRoutes from './app/routes/authRoutes';
import productRoutes from './app/routes/productRoute';

dotenv.config();
const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

if (!process.env.MONGODB_URL) {
  console.error('MONGODB_URL is not defined in the environment variables.');
  process.exit(1);
}

// Routes
app.use('/v1/api', authRoutes);
app.use('/v1/api/products', productRoutes);



app.use(function (req, res, next) {
  next(createError(404));
});

if(process.env.NODE_ENV !== 'test'){
mongoose.connect(process.env.MONGODB_URL as string)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error(err, 'err'));
}


// mongoose.connect(process.env.MONGODB_URL as string, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// } as mongoose.ConnectOptions)
//   .then(() => console.log('Connected to MongoDB'))
//   .catch(err => console.error(err, 'err'));

app.use(function (err: Error, req: Request, res: Response, next: NextFunction): void {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  const status = err instanceof createError.HttpError ? err.status : 500;

  res.status(status).send({
    message: `Route '${req.path}', NOT found`,
    status: 'error'
  });
});

const PORT = process.env.PORT || 5100;
app.listen(PORT, () => {
  console.log(`Server now running on port ${PORT}`);
});

export default app;
