import express = require("express");
let router: express.Router = express.Router();
const isAdmin = require("../middleware/isAdmin")
const isAuth = require("../middleware/isAuth")
const questionCtrl = require("../controllers/question")

router.get("/", questionCtrl.fetch)
router.put("/", isAuth, isAdmin, questionCtrl.add)
router.post("/", isAuth, isAdmin, questionCtrl.upd)
router.delete("/", isAuth, isAdmin, questionCtrl.del)

module.exports = router