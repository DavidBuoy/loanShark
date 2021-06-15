const db = require("../models");

// Defining methods for the LoansController
module.exports = {
  findAll: function (req, res) {
    db.Loan.find(req.query)
      .sort({ date: -1 })
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  // find returns queried loans
  find: function (req, res) {
    console.log("query in loansController:", query);
    db.Loan.find(query)
      .sort({ date: -1 })
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  findById: function (req, res) {
    db.Loan.findById(req.params.id)
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  create: function (req, res) {
    db.Loan.create(req.body)
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  update: function (req, res) {
    db.Loan.findOneAndUpdate({ _id: req.params.id }, req.body)
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  remove: function (req, res, next) {
    db.Loan.findById({ _id: req.params.id }, function (err, loan) {
      db.Payment.remove(
        {
          loan_id: {
            $in: loan._id,
          },
        },
        function (err) {
          if (err) return next(err);
        }
      );
      if (err) return next(err);
    })
      .then((dbModel) => dbModel.remove())
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
};
