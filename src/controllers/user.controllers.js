const express = require("express");
const User = require("../models/user.models");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { email, password, name } = req.body;
    const hashedPassword = await bcrypt.hash(password,10);
    const user = await User.create({ email, password: hashedPassword, name });
    return res.status(201).send(user);
  } catch (err) {
    return res.status(500).send(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({email: email});
    if(!user) {
      return res.status(401).send("user doesn't exists");
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);
    if(!isPasswordMatched) {
      return res.status(401).send("wrong password!");
    }

    const accessToken = jwt.sign({_id: user._id.toString(), email: user.email}, "SecretTokenSecretTokenSecretToken");
    return res.status(201).send({accessToken});
  } catch (err) {
      return res.status(500).send(err);
  }
});

module.exports = router;
