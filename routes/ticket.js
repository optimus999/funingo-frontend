import express from 'express';
import catchAsync from '../utilities/catch-async.js';
import {
  createTicketOrder,
  deleteTicket,
  getAllTickets,
  getDiscount,
  getQRTickets,
  saveTicketRiskImage,
  verifyTicketPayment,
  webhookPaymentVerification
} from '../controllers/ticket.js';
import { authenticateEmployee, authenticateUser } from '../middleware.js';
import { bookTicket } from '../controllers/employee/index.js';
import multer from 'multer';
import { storage } from '../cloudinary/index.js';
const upload = multer({ storage });

const router = express.Router();

router
  .route('/create-order')
  .post(authenticateUser, catchAsync(createTicketOrder));
router
  .route('/verify-payment')
  .post(authenticateUser, catchAsync(verifyTicketPayment));
router
  .route('/verify-payment-webhook')
  .post(catchAsync(webhookPaymentVerification));

router.get('/get-qr-tickets', authenticateUser, catchAsync(getQRTickets));
router.get('/get-all-tickets', authenticateUser, catchAsync(getAllTickets));
router.post('/get-discount', authenticateUser, catchAsync(getDiscount));
router.post(
  '/save-ticket-risk-image',
  authenticateUser,
  upload.single('image'),
  catchAsync(saveTicketRiskImage)
);

router.delete('/:short_id', authenticateUser, catchAsync(deleteTicket));

router.post('/e/book-ticket', authenticateEmployee, catchAsync(bookTicket));

export default router;
