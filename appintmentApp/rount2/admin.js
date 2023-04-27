const express=require('express');
const rout=express.Router();
const user=require('../constroller2/user')
rout.get('/getuser',user.getuser);

rout.post('/adduser',user.postadd)

rout.get('/add',user.postuser)
rout.post('/deleteuser/:id',user.deleteById)
module.exports=rout;