const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const jwtDecode = require("jwt-decode");
const { User } = require("../models");

const createToken = (user) => {
  // Sign the JWT

  return jwt.sign(
    {
      sub: user.id,
      email: user.email,
      iss: "auth.dubc",
      aud: "auth.dubc",
    },
    "itsasecret",
    { algorithm: "HS256", expiresIn: "1h" }
  );
};

const verifyPassword = (passwordAttempt, hashedPassword) => {
  return bcrypt.compare(passwordAttempt, hashedPassword);
};

const authPerson = async (req, res) => {
  try {
    const { email, password } = req.body;
    // console.log(req.body);
    const person = await User.find({ email }).exec();
    // console.log("person", person.length)
    if (person.length === 0) {
      console.log("made it")
      console.log("authPerson");
      return res.status(403).json({ message: "Wrong email or password." });
    }
    // console.log(`email: ${email}, password: ${password}`);
    // console.log("person pwd", person);

    const passwordValid = await verifyPassword(password, person[0].password);
    console.log(password)
    console.log(person[0].password)
    console.log(passwordValid);
    console.log("21");
    if (passwordValid) {
      const { password, name, ...rest } = person;
      const userInfo = Object.assign({}, { ...rest });
      const token = createToken(person);

      const decodedToken = jwtDecode(token);
      const expiresAt = decodedToken.exp;
      console.log(`token: ${token}, expiresAt: ${expiresAt}, userInfo: ${userInfo}`);
      return res.status(200).json({
        token,
        expiresAt,
        userInfo,
        message: "Successful authentication!",
      });
    } else {
      return res.status(403).json({
        message: "Wrong email or password.",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};

module.exports = {
  authPerson,
};
// pull all models out of models directory

// const bcrypt compare


// const authperson
// const email password
// if no personres.status(403).json({ message: wrong email or pw })

// const password valid

// query models.modelname
