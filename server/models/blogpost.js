const { DataTypes, Model}  = require('sequelize')
const db = require('../db/db')

class BlogPost extends Model{}

BlogPost.init({
  author: {
    type: DataTypes.STRING,
    allowNull: false
  },

  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  content: {
    type: DataTypes.STRING,
    allowNull: false
  },
  category:{
    type: DataTypes.STRING,
    allowNull: false
  },
}, {sequelize: db})


module.exports = BlogPost