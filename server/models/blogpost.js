const { DataTypes, Model } = require("sequelize");
const db = require("/app/server/db/db");

class BlogPost extends Model {}

BlogPost.init(
  {
    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    likecount: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    // have it as boolean or string ???
    // private:{
    //   type:DataTypes.BOOLEAN
    // },
    // public:{
    //   type:DataTypes.BOOLEAN
    // }
  },
  { sequelize: db }
);

module.exports = BlogPost;
