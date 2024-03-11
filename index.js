import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import { SNSClient } from '@aws-sdk/client-sns';
import Razorpay from 'razorpay';
import cron from 'node-cron';

import userRouter from './routes/user.js';
import otpRouter from './routes/otp.js';
import ticketRouter from './routes/ticket.js';
import packageRouter from './routes/package.js';
import qrRouter from './routes/qr-ticket.js';
import adminRouter from './routes/admin/index.js';
import imageRouter from './routes/images.js';
import couponRouter from './routes/coupon.js';
import phoneNoRouter from './routes/phone-no.js';
import franchiseRouter from './routes/franchise.js';
import careerApplicationSchema from './routes/career-application.js';
import { saveFreebiesAutomationFunction } from './utilities/utils.js';

if (['production', 'development'].includes(process.env.NODE_ENV)) {
  dotenv.config();
}

mongoose.connect(process.env.DB_URI).then(
  () => console.log('Database connected'),
  err => console.log('Error connecting database ', err)
);

export const sns_client = new SNSClient({
  region: 'ap-south-1'
});

export const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY_ID,
  key_secret: process.env.RAZORPAY_API_KEY_SECRET
});

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use('/user', userRouter);
app.use('/otp', otpRouter);
app.use('/ticket', ticketRouter);
app.use('/package', packageRouter);
app.use('/qr', qrRouter);
app.use('/admin', adminRouter);
app.use('/image', imageRouter);
app.use('/coupon', couponRouter);
app.use('/phone', phoneNoRouter);
app.use('/franchise', franchiseRouter);
app.use('/career-application', careerApplicationSchema);

app.get('/', async (req, res) => {
  res.status(200).send(`Server up and running on ${process.env.NODE_ENV}!`);
});

app.all('*', async (req, res) => {
  res.status(404).send({ error: 'Url not found!' });
});

app.use((err, req, res, next) => {
  const { status_code = 500 } = err;
  if (!err.message) err.message = 'internal_server_error';
  res.status(status_code).send({
    error: err.message
  });
});

cron.schedule('53 1 * * *', saveFreebiesAutomationFunction, {
  timezone: 'Asia/Kolkata',
  scheduled: true
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
