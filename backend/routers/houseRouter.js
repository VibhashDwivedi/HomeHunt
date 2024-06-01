const express = require('express');


const router = express.Router();
const Model = require('../models/houseModel');





router.post('/add',(req,res)=>{
    console.log(req.body);
    res.send('response from user add')
    //saving the data to mongodb
    new Model(req.body).save()
    .then((result) => {
      //res.json(result);
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json();
    });
});

router.get('/getall',(req,res)=>{

    Model.find({})
    .then((result) => {
        res.json(result);
    }).catch((err) => {
        console.log(err);
        res.status(500).json();
    });
  });

  router.get('/seller/:UserId', (req, res) => {
    const UserId = req.params.UserId;

    Model.find({ UserId: UserId })
        .then((result) => {
            res.json(result);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json();
        });
});

router.get('/getbyid/:id',(req,res)=>{
    const id = req.params.id;
    Model.findById(id)
    .then((result) => {
        res.json(result);
    }).catch((err) => {
        console.log(err);
        res.status(500).json();
    });
}
);

router.put('/edit/:id',(req,res)=>{
    const id = req.params.id;
    Model.findByIdAndUpdate(id,req.body)
    .then((result) => {
        res.json(result);
    }).catch((err) => {
        console.log(err);
        res.status(500).json();
    });
}
);
module.exports = router;
