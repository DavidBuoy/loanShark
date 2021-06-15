const { ObjectId } = require("bson");

const userSeed = [
  {
    _id: ObjectId("60adb73bc60ad5599803dbfc"),
    user_name: "David",
    password: "12345678",
    email: "david@gmail.com",
  },
  {
    _id: ObjectId("60adb73bc60ad5599803dbfd"),
    user_name: "Caitlin",
    password: "abcdefgh",
    email: "caitlin@gmail.com",
  },
  {
    _id: ObjectId("60adb73bc60ad5599803dbfe"),
    user_name: "Richard",
    password: "abcd1234",
    email: "richard@gmail.com",
  },
];

module.exports = userSeed;
