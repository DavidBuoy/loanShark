const mongoose = require("mongoose");
// const Schema = mongoose.Schema;

const { Schema } = mongoose;
mongoose.Promise = global.Promise;

const bcrypt = require('bcrypt');


const userSchema = new Schema({
  user_name: {
    type: String,
    required:true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
});



userSchema.pre("save", async function(next) {
  // const bcryptSalt= 10;
  console.log("Come back to life")
  let user = this;
  const hash = await bcrypt.hash(user.password, 10);
  user.password = hash;
  next();
});


// module.exports=mongoose.models.User || mongoose.model('User', userSchema);


const User = mongoose.model("User", userSchema);

module.exports = User;
