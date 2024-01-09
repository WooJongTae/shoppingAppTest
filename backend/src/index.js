const express = require("express");

const app = express();
const port = 4000;

app.get("/", (req, res) => {
  res.send("ㅎㅇㅎㅇ");
});

app.listen(port, () => {
  console.log("4000번 연결 완료");
});
