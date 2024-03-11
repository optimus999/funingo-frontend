import axios from 'axios';
import { apiUrl } from '../constants';

export const windowPurchase = async ({
  total_amount,
  details,
  token,
  phone_no,
  payment_mode
}) => {
  try {
    const response = await axios.post(
      `${apiUrl}/ticket/e/book-ticket`,
      { total_amount, details, phone_no, payment_mode },
      {
        headers: {
          token
        }
      }
    );
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
