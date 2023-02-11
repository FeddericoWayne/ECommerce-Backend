const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

class Category extends Model {}

Category.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    category_name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    }
  },
  {
    /*hooks: {
      beforeCreate:(newCategoryName) =>{
        const array = newCategoryName.category_name.split(" ");
        let formattedArray = [];
        for (element of array) {
          let upperCasedWord = element[0].toUpperCase() + element.substring(1).toLowerCase();
          formattedArray.push(upperCasedWord);
        }
        return formattedArray.toString().replaceAll(","," ");
      }
    },*/
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'category',
  }
);

module.exports = Category;
