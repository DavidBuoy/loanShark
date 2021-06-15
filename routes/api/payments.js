const router = require("express").Router();
const { get } = require("mongoose");
const paymentsController = require("../../controllers/paymentsController");

// Matches with "/api/payments"
router
  .route("/")
  .get(paymentsController.findAll)
  .post(paymentsController.create);

// Matches with "/api/payments/:id"
router
  .route("/:id")
  .get(paymentsController.findById)
  .put(paymentsController.update)
  .delete(paymentsController.remove);

// Matches with "/api/payments/:loan_id"
router.route("/:loan_id").get(paymentsController.find);

// Matches with "/api/payments/:user_id"
router.route("/:user_id").get(paymentsController.find);

module.exports = router;
