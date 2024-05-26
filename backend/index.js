const express = require('express');
const cors = require('cors');


const app = express();
const port = 5000;

app.use(cors({
    origin: ['localhost:3000']
}));
app.use(express.json());

app.get('/',(req, res)=>{
    res.send("hello from the server!!");
});

app.listen(5000, ()=>{
    console.log("server listening on 5000");
})