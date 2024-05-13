const express = require('express')
// const mongoose = require('mongoose');
require('dotenv').config()
const app = express();
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// const { Schema } = mongoose;

app.post('/product', (req,res)=>{
  res.sendStatus(400);
})

app.listen(process.env.PORT || 3000 ,()=>{
    console.log("server Started");
})
