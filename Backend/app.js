const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const hpp = require('hpp');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const cors = require('cors');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const userRouter = require('./routes/userRoute');
const planRouter = require('./routes/planRoute');
const paymentRouter = require('./routes/paymentRoute');
const attendanceRouter = require('./routes/attendanceRoute');
const classScheduleRouter = require('./routes/classScheduleRoute');
const classRegistrationRouter = require('./routes/classRegistrationRoute');
const { webhookCheckout } = require('./controllers/paymentController');

const app = express();

app.set('view engine', 'pug');
app.set('views', `${__dirname}/views`);

//Serving Static File
app.use(express.static(`${__dirname}/public`));

//Implement CORS
// app.use(
//   cors({
//     allowedHeaders: ['authorization', 'Content-Type'], // you can change the headers
//     exposedHeaders: ['authorization'], // you can change the headers
//     origin: '*',
//     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//     preflightContinue: false,
//   }),
// );
app.use(
  cors({
    origin: [
      'https://gym-advertising-and-management-website.vercel.app/',
      'http://127.0.0.1:5173',
    ],
    credentials: true,
  }),
);

//Security HTTP header
app.use(helmet());

// Further HELMET configuration for Security Policy (CSP)
// const scriptSrcUrls = [
//   'https://unpkg.com/',
//   'https://tile.openstreetmap.org',
//   'https://js.stripe.com',
//   'https://m.stripe.network',
//   'https://*.cloudflare.com',
// ];
// const styleSrcUrls = [
//   'https://unpkg.com/',
//   'https://tile.openstreetmap.org',
//   'https://fonts.googleapis.com/',
// ];
// const connectSrcUrls = [
//   'https://unpkg.com',
//   'https://tile.openstreetmap.org',
//   'https://*.stripe.com',
//   'https://bundle.js:*',
//   'ws://127.0.0.1:*/',
// ];
// const fontSrcUrls = ['fonts.googleapis.com', 'fonts.gstatic.com'];

// app.use(
//   helmet.contentSecurityPolicy({
//     directives: {
//       defaultSrc: ["'self'", 'data:', 'blob:', 'https:', 'ws:'],
//       baseUri: ["'self'"],
//       fontSrc: ["'self'", ...fontSrcUrls],
//       scriptSrc: ["'self'", 'https:', 'http:', 'blob:', ...scriptSrcUrls],
//       frameSrc: ["'self'", 'https://js.stripe.com'],
//       objectSrc: ["'none'"],
//       styleSrc: ["'self'", "'unsafe-inline'", ...styleSrcUrls],
//       workerSrc: ["'self'", 'blob:', 'https://m.stripe.network'],
//       childSrc: ["'self'", 'blob:'],
//       imgSrc: ["'self'", 'blob:', 'data:', 'https:'],
//       formAction: ["'self'"],
//       connectSrc: [
//         "'self'",
//         "'unsafe-inline'",
//         'data:',
//         'blob:',
//         ...connectSrcUrls,
//       ],
//       upgradeInsecureRequests: [],
//     },
//   }),
// );

//Data sanitization against NoSQL query injection
app.use(mongoSanitize());

//Prevent Parameter Pollution
app.use(hpp());

//Limit request
const limiter = rateLimit({
  max: 1000,
  windowMs: 60 * 60 * 1000,
  message: 'Too many request on this ip. Please try again later',
  validate: { xForwardedForHeader: false },
});

app.use('/api', limiter);

//Stripe Webhook checkout
app.post(
  '/webhook-checkout',
  express.raw({ type: 'application/json' }),
  webhookCheckout,
);

//Parse data from req.body
app.use(
  express.json({
    limit: '10mb',
  }),
);

//Parse data from cookie
app.use(cookieParser());

//Log response
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

//Compress
app.use(compression());

//Routers
app.use('/api/v1/users', userRouter);
app.use('/api/v1/plans', planRouter);
app.use('/api/v1/payments', paymentRouter);
app.use('/api/v1/attendances', attendanceRouter);
app.use('/api/v1/classSchedules', classScheduleRouter);
app.use('/api/v1/classRegistrations', classRegistrationRouter);

// Handle Unhandled Routes
app.all('*', (req, res, next) => {
  next(new AppError(`Không tìm thấy ${req.originalUrl} trên máy chủ!`, 404));
});

// Error Handler Middleware
app.use(globalErrorHandler);

module.exports = app;
