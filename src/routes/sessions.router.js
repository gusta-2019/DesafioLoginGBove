const express = require("express");
const router = express.Router();
const UserModel = require("../models/user.model.js");
const { isValidPassword } = require("../utils/hashbcryp.js");
const passport = require("passport");

//Login
///Version con Passport: 

router.post("/login", passport.authenticate("login", {failureRedirect: "/api/sessions/faillogin"}), async (req, res) => {
    if(!req.user) return res.status(400).send({status:"error"});

    req.session.user = {
        first_name: req.user.first_name,
        last_name: req.user.last_name,
        age: req.user.age,
        email:req.user.email
    };

    req.session.login = true;

    res.redirect("/products");

})

router.get("/faillogin", async (req, res) => {
    res.send({error: "Fallo todoooooo el login"});
})

//Logout

router.get("/logout", (req, res) => {
    if (req.session.login) {
        req.session.destroy();
    }
    res.redirect("/login");
})

module.exports = router;