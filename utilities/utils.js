import { sns_client } from '../index.js';
import { PublishCommand } from '@aws-sdk/client-sns';
import Coupon from '../models/coupon.js';
import Ticket from '../models/ticket.js';
import { v4 as uuidv4 } from 'uuid';
import cloudinary from '../cloudinary/index.js';

export const sendMessageToPhone = async ({ phone_no, message }) => {
  const params = {
    Message: message,
    PhoneNumber: phone_no,
    MessageAttributes: {
      'AWS.SNS.SMS.SMSType': {
        DataType: 'String',
        StringValue: 'Transactional'
      }
    }
  };
  // Sending SMS
  if (process.env.NODE_ENV === 'production') {
    await sns_client.send(new PublishCommand(params));
  }
};

export const calculateDiscountPrice = async ({ code, total_amount }) => {
  const coupon = await Coupon.findOne({ code });
  let discount = 0;
  let msg = '';
  if (coupon?.discount_type === 'flat') {
    if (coupon.min_amount <= total_amount) {
      discount = Math.min(coupon.discount, coupon.max_discount);
    } else {
      msg = `Minimum amount should be Rs. ${coupon.min_amount}`;
    }
  } else if (coupon?.discount_type === 'percent') {
    if (coupon.min_amount <= total_amount) {
      discount = Math.min(
        Math.floor((coupon.discount * total_amount) / 100),
        coupon.max_discount
      );
    } else {
      msg = `Minimum amount should be Rs. ${coupon.min_amount}`;
    }
  } else {
    msg = `Invalid coupon code`;
  }
  return { discount, msg };
};

export const calculateFuningoMoneyToAdd = amount => {
  if (amount < 1000) return 0;
  if (amount >= 1000 && amount < 3000) return 200;
  if (amount >= 3000 && amount < 5000) return 400;
  return 500;
};

const saveLeftFlags = async ticket => {
  if (!ticket || ticket.expired || !ticket.user) {
    return;
  }
  let existingFlags = [];
  for (let tic of ticket.details) {
    if (tic.premium_discount === '100%') continue;
    if (!tic.qr_ticket) continue;
    const temp = {
      red: tic.qr_ticket?.red || 0,
      green: tic.qr_ticket?.green || 0,
      yellow: tic.qr_ticket?.yellow || 0,
      golden: tic.qr_ticket?.golden || 0,
      expires_on: Date.now() + 30 * 24 * 60 * 60 * 1000, // 30days
      id: uuidv4()
    };
    tic.qr_ticket.red = 0;
    tic.qr_ticket.green = 0;
    tic.qr_ticket.yellow = 0;
    tic.qr_ticket.golden = 0;

    tic.qr_ticket.freebies_added = temp;

    await tic.qr_ticket.save();

    if (temp.red || temp.green || temp.yellow || temp.golden) {
      existingFlags.push(temp);
    }
  }
  ticket.freebies_added = existingFlags.reduce(
    (totalFreebies, freebies) => {
      return {
        red: totalFreebies.red + freebies.red,
        green: totalFreebies.green + freebies.green,
        yellow: totalFreebies.yellow + freebies.yellow,
        golden: totalFreebies.golden + freebies.golden
      };
    },
    {
      red: 0,
      green: 0,
      yellow: 0,
      golden: 0
    }
  );

  ticket.expired = true;
  ticket.user.existing_flags = [
    ...(ticket.user?.existing_flags || []),
    ...existingFlags
  ];
  await ticket.user.save();
  await ticket.save();
  console.log(`Freebies added for ${ticket.short_id}`);
};

export const saveFreebiesAutomationFunction = async () => {
  try {
    const tickets = await Ticket.find({
      fun_date: {
        $gte: new Date(new Date().setHours(0, 0, 0, 0)),
        $lt: new Date(new Date().setHours(23, 59, 59, 0))
      }
    }).populate(['details.qr_ticket', 'user']);

    for (let ticket of tickets) {
      await saveLeftFlags(ticket);
      if (ticket.riskConsentImage.filename) {
        cloudinary.cloudinary.uploader.destroy(
          ticket.riskConsentImage.filename
        );
        ticket.riskConsentImage = null;
        await ticket.save();
      }
    }

    console.log(
      'Freebies saved for todays tickets at',
      new Date().toDateString(),
      new Date().toTimeString()
    );
  } catch (err) {
    console.log(err);
  }
};

export const monthDataToGroupOfWeeks = data => {
  const response = {
    1: 0,
    2: 0,
    3: 0,
    4: 0
  };
  let prevDay = -1,
    weekNo = 1;
  for (let day of data) {
    if (prevDay === -1) {
      response[weekNo] = day.total_revenue;
    } else if (day.dayOfWeek > prevDay) {
      response[weekNo] += day.total_revenue;
    } else {
      weekNo += 1;
      response[weekNo] = day.total_revenue;
    }
    prevDay = day.dayOfWeek;
  }
  return Object.values(response);
};
