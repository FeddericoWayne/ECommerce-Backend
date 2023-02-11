const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

class Tag extends Model {}

Tag.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    tag_name: {
      type: DataTypes.STRING,
      unique: true
    },
  },
  { 
    hooks: {
      beforeCreate: async (newTagData)=>{
        const newLowerCasedTag = await newTagData.tag_name.toLowerCase();
        newTagData.tag_name = newLowerCasedTag;
        return newTagData;
      },
      beforeUpdate: async (updatedTagData)=>{
        const updatedLowerCasedTag = await updatedTagData.tag_name.toLowerCase();
        updatedTagData.tag_name = updatedLowerCasedTag;
        return updatedTagData;
      }
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'tag',
  }
);

module.exports = Tag;
