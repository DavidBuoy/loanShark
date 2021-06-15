const { ObjectId } = require("bson");

const paymentSeed = [
  {
    _id: ObjectId("60adb73bc60ad5599803dc05"),
    balance: 500,
    loan_id: ObjectId("60adb73bc60ad5599803dbff"),
    date: "May 5, 2021",
    user_id: ObjectId("60adb73bc60ad5599803dbfc")
  },
  {
    _id: ObjectId("60adb73bc60ad5599803dc06"),
    balance: 500,
    loan_id: ObjectId("60adb73bc60ad5599803dbff"),
    date: "May 6, 2021",
    user_id: ObjectId("60adb73bc60ad5599803dbfc")
  },
  {
    _id: ObjectId("60adb73bc60ad5599803dc07"),
    balance: 500,
    loan_id: ObjectId("60adb73bc60ad5599803dbff"),
    date: "May 7, 2021",
    user_id: ObjectId("60adb73bc60ad5599803dbfc")
  },
  {
    _id: ObjectId("60adb73bc60ad5599803dc08"),
    balance: 500,
    loan_id: ObjectId("60adb73bc60ad5599803dc00"),
    date: "May 8, 2021",
    user_id: ObjectId("60adb73bc60ad5599803dbfd")
  },
  {
    _id: ObjectId("60adb73bc60ad5599803dc09"),
    balance: 500,
    loan_id: ObjectId("60adb73bc60ad5599803dc01"),
    date: "May 9, 2021",
    user_id: ObjectId("60adb73bc60ad5599803dbfe")
  },
  {
    _id: ObjectId("60adb73bc60ad5599803dc0a"),
    balance: 500,
    loan_id: ObjectId("60adb73bc60ad5599803dc01"),
    date: "May 10, 2021",
    user_id: ObjectId("60adb73bc60ad5599803dbfe")
  },
  {
    _id: ObjectId("60adb73bc60ad5599803dc0b"),
    balance: 500,
    loan_id: ObjectId("60adb73bc60ad5599803dc02"),
    date: "May 10, 2021",
    user_id: ObjectId("60adb73bc60ad5599803dbfc")
  },
  {
    _id: ObjectId("60adb73bc60ad5599803dc0c"),
    balance: 500,
    loan_id: ObjectId("60adb73bc60ad5599803dc03"),
    date: "May 10, 2021",
    user_id: ObjectId("60adb73bc60ad5599803dbfd")
  },
  {
    _id: ObjectId("60adb73bc60ad5599803dc0d"),
    balance: 500,
    loan_id: ObjectId("60adb73bc60ad5599803dc03"),
    date: "May 10, 2021",
    user_id: ObjectId("60adb73bc60ad5599803dbfd")
  },
];

module.exports = paymentSeed;
