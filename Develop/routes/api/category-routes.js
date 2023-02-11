const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async(req, res) => {

  // try-catch statement to retrieve all categories with associated products
  try {
    const categoryData =  await Category.findAll({
      include: [{model:Product}]
    });

    // if no data is found
    if(!categoryData || categoryData.length === 0) {
      res.status(404).json({message:"Data Not Found!"});
      return;
    }

    // sends back data
    res.status(200).json(categoryData);
    
  // catches error and sends it back  
  } catch(err) {
    res.status(400).json(err);

  }
});

router.get('/:id', async (req, res) => {
  // try-catch statement to retrieve category and associated product info by id parameter
  try {
    const categoryData = await Category.findByPk(req.params.id,{
      // to include product info in the resulting data
      include:[{model:Product}]
    });
    // if no data is found
    if(!categoryData) {
      res.status(404).json({message: "Data Not Found!"});
      return;
    }
    // sends back resulting data
    res.status(200).json(categoryData);

  // catches and sends back error
  } catch(err) {
    res.status(400).json(err);
  }
});

router.post('/', async (req, res) => {
  
  // try-catch statement to creat a new category
  try {

    // creates a new category
    await Category.create(req.body);

    // sends success message back 
    res.status(200).json({message:`New Category Created: ${req.body.category_name.toLowerCase()}`});

  // catches and returns error  
  } catch(err) {
    res.status(400).json(err);
  }

});

router.put('/:id', async (req, res) => {
  
  // try-catch statement to update category by id
  try {

    // locates the category to be udpated by primary key 
    const updatedCategory = await Category.findByPk(req.params.id);

    // if category cannot be found
    if (!updatedCategory || updatedCategory.length ===0) {
      res.status(404).json({message: "Category Not Found!"});
      return;
    }

    // once category is located, sequel updates category name
    await Category.update(req.body,{
      where: {
        id: req.params.id
      },
      individualHooks:true
    });

    // sends success messages back
    res.status(200).json({message:`Category Updated to: ${req.body.category_name.toLowerCase()}`});


  // catches and returns error
  } catch(err) {

    res.status(400).json(err);
  }
});

router.delete('/:id', async (req, res) => {

  // try-catch statement to delete a category
  try {

    // locates the category to be deleted by primary key
    const deletedCategory = await Category.findByPk(req.params.id);

    // if parameter entered cannot be found
    if (!deletedCategory) {

      res.status(404).json({message:"Category Not Found!"});
      return;
    }

    // sequelize deletes category from database
    await Category.destroy({
      where:{
        id: req.params.id
      }
    });

    // sends back success message
    res.status(200).json({message: `Deleted Category: ${deletedCategory.category_name}`});

  // catches and returns error
  } catch(err) {
    res.status(400).json(err);
  }
  
});

module.exports = router;
