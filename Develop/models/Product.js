// import important parts of sequelize library
const { Model, DataTypes } = require('sequelize');
// import our database connection from config.js
const sequelize = require('../config/connection');

// Initialize Product model (table) by extending off Sequelize's Model class
class Product extends Model {}

// set up fields and rules for Product model
Product.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    product_name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    price: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false,
      validate: {
        isDecimal: true
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 10,
      validate: {
        isNumeric: true
      }
    },
    category_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "category",
        key: "id",
      }
    }
  },
  {
    hooks: {
      beforeCreate: async (newProductData)=>{
        const newLowerCasedProductName = await newProductData.product_name.toLowerCase();
        newProductData.product_name = newLowerCasedProductName;
        return newProductData;
      },
      beforeUpdate: async (updatedProductData)=>{
        const updatedLowerCasedProductName = await updatedProductData.product_name.toLowerCase();
        updatedProductData.product_name = updatedLowerCasedProductName;
        return updatedProductData;
      }
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product',
  }
);

module.exports = Product;
