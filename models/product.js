const { STRING } = require('sequelize');
const Sequelize=require('sequelize')
const sequelize=require('../util/database');

const Product=sequelize.define('product',{
  id:{
    type:Sequelize.INTEGER,
    autoIncrement:true,
    alowNull:false,
    primaryKey:true
  },
  title:Sequelize.STRING,
  price:{
    type:Sequelize.DOUBLE,
    alowNull:false
  },
  imageUrl:{
    type:Sequelize.STRING,
    alowNull:false
  },
  description:{
    type:Sequelize.STRING,
    alowNull:false
  }
});

module.exports=Product;