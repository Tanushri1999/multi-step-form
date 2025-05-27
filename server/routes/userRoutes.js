const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const upload = require("../middleware/uploadMiddleware");
const validateUser = require("../middleware/validateUser");

router.get("/check-username", userController.checkUsernameAvailability);
router.post("/save", upload.single("profilePhoto"), validateUser, userController.saveUser);

router.get("/countries", userController.getCountries);
router.get("/states/:country", userController.getStates);
router.get("/cities/:country/:state", userController.getCities);

module.exports = router;
