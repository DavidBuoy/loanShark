const router = require("express").Router();
const { Payment } = require("../../models");
const loansController = require("../../controllers/loansController");

// Matches with "/api/loans"
router.route("/").get(loansController.findAll).post(loansController.create);

// Matches with "/api/loans/:id"
router
  .route("/:id")
  .get(loansController.findById)
  .put(loansController.update)
  .delete(loansController.remove);

// Matches with "/api/loans/:user_id"
router.route("/:user_id").get(loansController.find);

module.exports = router;
