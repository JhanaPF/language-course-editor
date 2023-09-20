const express = require("express")
const router = express.Router()
const userCtrl = require("../controllers/user")
const isAuth = require("../middleware/isAuth")

router.post("/token", isAuth, userCtrl.token)
router.post("/signup", userCtrl.signup)
router.post("/signin", userCtrl.signin)

module.exports = router