const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const paymentSchema = new Schema({
  balance: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now,
    required: true
  },
  loan_id: {
    ref: "Loan",
    type: Schema.Types.ObjectId,
    required: true
  },
  user_id: {
    ref: "User",
    type: Schema.Types.ObjectId,
    required: true
  },
});

const Payment = mongoose.model("Payment", paymentSchema);

module.exports = Payment;
