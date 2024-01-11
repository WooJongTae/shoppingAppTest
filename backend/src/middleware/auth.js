const jwt = require("jsonwebtoken");
const User = require("../models/User");

let auth = async (req, res, next) => {
  const authHeader = req.headers[`authorization`];

  const token = authHeader && authHeader.split(" ")[1];
  console.log(token);
  if (token === null) return res.sendStatus(401);

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ _id: decode.userId });
    console.log(user);
    if (!user) {
      return res.status(400).send("올바르지 않은 토큰입니다.");
    }

    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = { auth };
