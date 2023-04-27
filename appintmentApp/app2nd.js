const express=require('express');
const cros=require('cors')
const bodyParser = require('body-parser');

const sequelize=require('./util/database')
const adminrout=require('./rount2/admin');
app=express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))
app.use(cros())
app.use(adminrout)

sequelize.sync().then(result=>{
    //  console.log(result)
      app.listen(3000,()=>console.log("server Running..."));
})
   .catch(err=>console.log(err))