const express = require("express");
const cors = require("cors");
require('dotenv').config({ path: '.env' });

const app = express();
const port = 5000;
const userRouter = require("./routers/userRouter");
const houseRouter = require('./routers/houseRouter');
const utilRouter = require('./routers/util');

app.use(
  cors({
    origin: [ "https://home-hunt-find-home-near-you.vercel.app", "http://localhost:3000"],
  })
);
app.use(express.json());
app.use(express.static('./uploads'));

app.use("/user", userRouter);
app.use('/house',houseRouter);
app.use('/util',utilRouter);

app.get("/", (req, res) => {
  res.send("hello from the server!!");
});

app.listen(5000, () => {
  console.log("server listening on 5000");
});
