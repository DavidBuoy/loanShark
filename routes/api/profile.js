// /:id/profile  Need to cross reference id by unique email
const router = require("express").Router();
const profileController = require("../../controllers/profileController");

const { authPerson } = require("../../controllers/authController");
router.post("/profile", authPerson);


// Matches with "/api/profile/:id"
router
  .route("/:id")
  .get(profileController.findById)

module.exports = router;



