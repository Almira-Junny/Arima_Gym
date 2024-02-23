const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const catchAsync = require('../utils/catchAsync');
const Plan = require('../models/planModel');
const Payment = require('../models/paymentModel');
const User = require('../models/userModel');
const {
  getAll,
  getOne,
  updateOne,
  deleteOne,
  createOne,
} = require('./handlerFactory');

exports.getCheckoutSession = catchAsync(async (req, res, next) => {
  const plan = await Plan.findById(req.params.planId);

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    payment_method_types: ['card'],
    success_url: `${process.env.FE_URL}/?isPayment=true`,
    cancel_url: `${process.env.FE_URL}/payment`,
    customer_email: req.user.email,
    client_reference_id: req.params.planId,
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: 'VND',
          unit_amount: plan.price,
          product_data: {
            name: plan.name,
            description: plan.description,
          },
        },
      },
    ],
  });

  res.status(200).json({
    status: 'success',
    session,
  });
});

const createPaymentCheckout = catchAsync(async (data) => {
  const plan = data.client_reference_id;
  const user = await User.findOne({ email: data.customer_email });
  const amount = data.amount_total;
  const paymentMethod = data.payment_method_types[0];
  const status = data.payment_status;

  await Payment.create({ plan, user: user._id, amount, paymentMethod, status });

  const planData = await Plan.findById(plan);

  let updateData;

  if (!user.membershipStartDate) {
    updateData = {
      plan,
      membershipStartDate: Date.now(),
      membershipEndDate: Date.now() + planData.duration * 24 * 60 * 60 * 1000,
    };
  } else {
    let membershipEndDate = new Date();
    if (user.membershipEndDate < Date.now) {
      membershipEndDate = Date.now() + planData.duration * 24 * 60 * 60 * 1000;
    } else {
      membershipEndDate =
        user.membershipEndDate.getTime() +
        planData.duration * 24 * 60 * 60 * 1000;
    }
    updateData = {
      plan,
      membershipEndDate,
    };
  }

  await User.findByIdAndUpdate(user._id, updateData);
});

exports.webhookCheckout = async (req, res, next) => {
  const signature = req.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      signature,
      process.env.STRIPE_ENDPOINT_SECRET,
    );
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  switch (event.type) {
    case 'checkout.session.completed':
      await createPaymentCheckout(event.data.object);
      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.status(200).json({
    status: 'success',
  });
};

exports.getPaymentByName = catchAsync(async (req, res, next) => {
  const { name } = req.params;

  const data = await Payment.aggregate([
    {
      $lookup: {
        from: 'users',
        localField: 'user',
        foreignField: '_id',
        as: 'user',
      },
    },
    {
      $match: {
        'user.fullName': { $regex: name, $options: 'i' },
      },
    },
    {
      $unwind: '$user',
    },
  ]);

  res.status(200).json({
    status: 'success',
    result: data.length,
    data,
  });
});

exports.getAllPayments = getAll(Payment);
exports.getPayment = getOne(Payment);
exports.createPayment = createOne(Payment);
exports.updatePayment = updateOne(Payment);
exports.deletePayment = deleteOne(Payment);
