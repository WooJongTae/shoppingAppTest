const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
const dotenv = require("dotenv");

dotenv.config();
const app = express();
const port = 4000;
app.use(express.static(path.join(__dirname, "../uploads")));
app.use(cors());
app.use(express.json());
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("몽고db연결 완료");
  })
  .catch((err) => {
    console.err(err);
  });

app.use("/users", require("./routes/users"));
app.use("/products", require("./routes/products"));

app.use((error, req, res, next) => {
  console.log("여기인가", error.status);
  console.log("여기인가2", error.message);
  res.status(error.status || 500);
  res.send(error.message || "서버에서 에러가 났습니다!");
});

app.get("/", (req, res) => {
  res.send("ㅎㅇㅎㅇ");
});

app.listen(port, () => {
  console.log("4000번 연결 완료");
});
