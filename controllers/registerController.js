const db = require("../models");


// Create new user, once user is redirected to the Profile they can add loan info
module.exports = {
  create: function (req, res) {
    db.User.create(req.body)
      .then((dbModel) => res.json(dbModel))
      
      .catch((err) => res.status(422).json(err));
    },
};

