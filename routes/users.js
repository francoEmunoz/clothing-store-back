var express = require("express");
var router = express.Router();
let passport = require("../config/passport");

const { signUp, verifyMail, signIn, verifyToken, read, signOut, editProfile } = require("../controllers/userController");

router.get("/verify/:code", verifyMail);
router.get("/token", passport.authenticate("jwt", { session: false }), verifyToken);
router.post("/signup", signUp);
router.post("/signin", signIn);
router.post("/signout/:id", signOut);
router.get("/:id", passport.authenticate("jwt", { session: false }), read);
router.patch("/:id", passport.authenticate("jwt", { session: false }), editProfile);

module.exports = router;