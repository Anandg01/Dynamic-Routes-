const { STRING } = require('sequelize');
const Sequelize=require('sequelize')
const sequelize=require('../util/database');

const User=sequelize.define('user',{
  id:{
    type:Sequelize.INTEGER,
    autoIncrement:true,
    alowNull:false,
    primaryKey:true
  },
  name:Sequelize.STRING,
 
  email:{
    type:Sequelize.STRING,
    alowNull:false
  },
  PhoneNumber:{
    type:Sequelize.INTEGER,
    alowNull:false
  }
 
});

module.exports=User;