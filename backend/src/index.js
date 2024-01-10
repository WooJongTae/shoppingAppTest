const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
const dotenv = require("dotenv");

dotenv.config();
const app = express();
const port = 4000;
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("몽고db연결 완료");
  })
  .catch((err) => {
    console.err(err);
  });

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.status(error.message || "서버에서 에러가 났습니다!");
});

app.use(express.static(path.join(__dirname, "../uploads")));
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("ㅎㅇㅎㅇ");
});

app.use("/users", require("./routes/users"));

app.listen(port, () => {
  console.log("4000번 연결 완료");
});
