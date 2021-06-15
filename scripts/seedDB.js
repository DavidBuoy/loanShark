const loanSeed = require("./loan-seed");
const paymentSeed = require("./payment-seed");
const userSeed = require("./user-seed");
const db = require("../models");

const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/loanShark", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

const seedAll = async () => {
  await db.User.deleteMany()
    .then(() => {
      userSeed.map(async user => {
        await db.User.create (user)
      })
    })
    // db.User.collection.insertMany(userSeed))
    .then((data) => {
      console.log(" user records inserted!");
    })
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });

  await db.Loan.deleteMany()
    .then(() => db.Loan.collection.insertMany(loanSeed))
    .then((data) => {
      console.log(data.result.n + " loan records inserted!");
    })
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });

  await db.Payment.deleteMany()
    .then(() => db.Payment.collection.insertMany(paymentSeed))
    .then((data) => {
      console.log(data.result.n + " payment records inserted!");
    })
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
};

seedAll();
