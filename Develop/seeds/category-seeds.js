const { Category } = require('../models');


const categoryData = [
  {
    category_name: 'shirts',
  },
  {
    category_name: 'shorts',
  },
  {
    category_name: 'music',
  },
  {
    category_name: 'hats',
  },
  {
    category_name: 'shoes',
  },
];

const seedCategories = () => Category.bulkCreate(categoryData);


module.exports = seedCategories;
