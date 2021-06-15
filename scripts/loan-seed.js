const { ObjectId } = require("bson");

const loanSeed = [
  {
    _id: ObjectId("60adb73bc60ad5599803dbff"),
    name: "1969 Volkswagon Beetle",
    date: "May 22, 2021",
    amount: 11500,
    user_id: ObjectId("60adb73bc60ad5599803dbfc"),
  },
  {
    _id: ObjectId("60adb73bc60ad5599803dc00"),
    name: "DU Bootcamp",
    date: "May 22, 2021",
    amount: 10000,
    user_id: ObjectId("60adb73bc60ad5599803dbfd"),
  },
  {
    _id: ObjectId("60adb73bc60ad5599803dc01"),
    name: "1971 Corvette Stingray",
    date: "May 22, 2021",
    amount: 10000,
    user_id: ObjectId("60adb73bc60ad5599803dbfe"),
  },
  {
    _id: ObjectId("60adb73bc60ad5599803dc02"),
    name: "Nissan 350Z",
    date: "May 20, 2021",
    amount: 15000,
    user_id: ObjectId("60adb73bc60ad5599803dbfc"),
  },
  {
    _id: ObjectId("60adb73bc60ad5599803dc03"),
    name: "Subaru BRZ",
    date: "May 10, 2021",
    amount: 20000,
    user_id: ObjectId("60adb73bc60ad5599803dbfd"),
  },
  {
    _id: ObjectId("60adb73bc60ad5599803dc04"),
    name: "2019 Toyota Tacoma",
    date: "May 5, 2021",
    amount: 2000,
    user_id: ObjectId("60adb73bc60ad5599803dbfe"),
  },
];

module.exports = loanSeed;
