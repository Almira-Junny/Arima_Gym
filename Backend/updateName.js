require('dotenv').config();

const mongoose = require('mongoose');
const User = require('./models/userModel');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Database Connection Successful!');
  });

const updateName = async () => {
  try {
    const users = await User.find();

    users.forEach((user) => {
      user.fullName = `${user.lastName} ${user.firstName}`;
    });

    const promise = users.reduce((result, user) => {
      result = [...result, user.save({ validateBeforeSave: false })];
      return result;
    }, []);

    await Promise.all(promise);

    console.log('Success');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

updateName();
