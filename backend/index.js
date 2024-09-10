const express = require("express");
const cors = require("cors");
const axios = require("axios");
require('dotenv').config({ path: '.env' });

const url = process.env.BACKEND_URL;


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

const interval = 30000;

function reloadWebsite() {
  axios.get(url)
    .then(response => {
      console.log(`Reloaded at ${new Date().toISOString()}: Status Code ${response.status}`);
    })
    .catch(error => {
      console.error(`Error reloading at ${new Date().toISOString()}:`, error.message);
    });
}

setInterval(reloadWebsite, interval);


app.listen(5000, () => {
  console.log("server listening on 5000");
});
