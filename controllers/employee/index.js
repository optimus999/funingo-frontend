import ShortUniqueId from 'short-unique-id';
import User from '../../models/user.js';
import Package from '../../models/package.js';
import ExpressError from '../../utilities/express-error.js';
import Ticket from '../../models/ticket.js';
import constants from '../../constants.js';

export const bookTicket = async (req, res) => {
  const { details, total_amount, phone_no, payment_mode } = req.body;
  let totalAmount = 0;
  const user = await User.findOne({ phone_no });

  const newDetails = await Promise.all(
    details.map(async person => {
      const existing = person?.freebie;
      const freebies = user?.existing_flags?.find(
        exist => exist.id === existing
      );
      if (person.package) {
        const pack = await Package.findById(person.package);
        totalAmount += pack.price;
        totalAmount +=
          constants.red_flag_price *
          Math.max(person.extra_red - (freebies?.red ?? 0), 0);
        totalAmount +=
          constants.yellow_flag_price *
          Math.max(person.extra_yellow - (freebies?.yellow ?? 0), 0);
        totalAmount +=
          constants.green_flag_price *
          Math.max(person.extra_green - (freebies?.green ?? 0), 0);
      }
      totalAmount += constants.golden_flag_price * person.golden_flag;

      person.extra_red += freebies?.red ?? 0;
      person.extra_green += freebies?.green ?? 0;
      person.extra_yellow += freebies?.yellow ?? 0;

      return person;
    })
  );

  totalAmount += 0.18 * totalAmount;
  totalAmount = Math.round((totalAmount + Number.EPSILON) * 100) / 100;

  if (totalAmount !== total_amount) {
    throw new ExpressError("Total amount doesn't match", 400);
  }
  const new_short_id = new ShortUniqueId({
    dictionary: 'number'
  });

  const newTicket = new Ticket({
    fun_date: new Date(),
    total_amount,
    expired: false,
    payment_verified: true,
    details: newDetails,
    short_id: new_short_id(),
    user,
    payment_mode,
    phone_no: phone_no ?? ''
  });

  await newTicket.save();

  res.status(200).send({
    short_id: newTicket.short_id,
    success: true
  });
};
