const express = require("express");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { auth } = require("../middleware/auth");

const router = express.Router();

router.get("/auth", auth, async (req, res, next) => {
  return res.status(200).json({
    _id: req.user._id,
    email: req.user.email,
    name: req.user.name,
    role: req.user.role,
    image: req.user.image,
    cart: [],
    history: req.user.history,
  });
});

router.post("/register", async (req, res, next) => {
  try {
    const user = new User(req.body);
    await user.save();
    return res.sendStatus(200);
  } catch (err) {
    next(err);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(400).send("이메일이 없습니다.!");
    }

    const isMatch = await user.comparePassword(req.body.password);
    if (!isMatch) {
      return res.status(400).send("비밀번호가 틀립니다.!");
    }
    const payload = {
      userId: user._id.toHexString(),
    };

    const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return res.json({ user, accessToken });
  } catch (err) {
    next(err);
  }
});

router.post("/logout", auth, async (req, res, next) => {
  try {
    return res.sendStatus(200);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
