const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const loanSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: "Choose an name",
  },
  date: {
    type: Date,
    default: Date.now,
    required: true
  },
  amount: {
    type: Number,
    required: "Choose a loan amount",
  },
  user_id: {
    ref: "User",
    type: Schema.Types.ObjectId,
    required: true
  },
});

const Loan = mongoose.model("Loan", loanSchema);

module.exports = Loan;
