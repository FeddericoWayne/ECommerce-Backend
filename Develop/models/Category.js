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
    hooks: {
      beforeCreate: async (newCategory)=>{
        const lowerCasedNewCategory = await newCategory.dataValues.category_name.toLowerCase();
        newCategory.dataValues.category_name = lowerCasedNewCategory;
        return newCategory;
      },
      beforeUpdate: async (updatedCategory)=>{
        const lowerCasedUpdatedCategory = await updatedCategory.dataValues.category_name.toLowerCase();
        updatedCategory.dataValues.category_name = lowerCasedUpdatedCategory;
        return updatedCategory;
      }
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'category',
  }
);

module.exports = Category;
