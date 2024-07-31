const express = require('express');
const bcrypt = require('bcrypt');

const router = express.Router();
const Model = require('../models/userModel');





router.post('/add', async (req,res)=>{
    try{
    console.log(req.body);
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const userData = { ...req.body, password: hashedPassword };
    // res.send('response from user add')
    //saving the data to mongodb
    const result =  await new Model(userData).save()
    res.json(result);
    }
    catch(err)  {
        console.log(err);
        res.status(500).json();
    };
});




  // router to get a user by id


  router.put('/update/:id',(req,res)=>{
    Model.findByIdAndUpdate(req.params.id, req.body,{new:true})
    .then((result) => {
        res.json(result);
    }).catch((err) => {
        console.log(err);
        res.status(500).json();
    });
    })


router.post('/authenticate',(req,res)=>{
  Model.findOne(req.body)
  .then((result) => {
      if(result !== null)
      res.json(result);
      else
      res.status(401).json({message:'login failed'})
  }).catch((err) => {
      console.log(err);
      res.status(500).json();
  });
})



router.get('/getall',(req,res)=>{

  Model.find({})
  .then((result) => {
      res.json(result);
  }).catch((err) => {
      console.log(err);
      res.status(500).json();
  });
});

//check if the user is already present using email
router.get('/checkemail/:email',(req,res)=>{

  //return 200 if email is available and 401 if not available
  Model.find({email:req.params.email})
  .then((result) => {
      if(result.length === 0)
      res.status(200).json();
      else
      res.status(401).json();
  }).catch((err) => {
      console.log(err);
      res.status(500).json();
  });
});







module.exports = router;