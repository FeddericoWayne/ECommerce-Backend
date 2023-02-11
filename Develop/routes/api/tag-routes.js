 const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {

  // try-catch statement to retrieve all tags with associated product data
  try {
    
      const tagData = await Tag.findAll({
         include:[{model:Product}]
      });
    
    // if no data is found
    if (!tagData || tagData.length ===0) {
      res.status(404).json({message: "Data Not Found!"});
      return;
    };

    // sends back tag data
    res.status(200).json(tagData);

  // catches and returns error
  } catch(err) {
    res.status(400).json(err);
  }
});

router.get('/:id', async (req, res) => {

  // try-catch statement to retrieve tag data by id with associated product data
  try {
    const tagData = await Tag.findByPk(req.params.id,{
      include:[{model:Product}]
    });

    if (!tagData) {
      res.status(404).json({message:"Tag Not Found!"});
      return;
    };
    
    res.status(200).json(tagData);

  // catches and returns error
  } catch(err) {

    res.status(400).json(err);
  }
});

router.post('/', async (req, res) => {
  
  // try-catch statement to create a new tag
  try {
    
    await Tag.create(req.body);

    // sends success message back 
    res.status(200).json({message:`New Tag Created: ${req.body.tag_name}`});

  // catches and returns error   
  } catch(err) {
    res.status(400).json(err)
  }
});

router.put('/:id', async (req, res) => {

  // try-catch statement to update a tag by id
  try {
    const updatedTag = await Tag.findByPk(req.params.id);
    // if tag is not found
    if (!updatedTag || updatedTag.length ===0 ) {
      res.status(404).json({message:"Tag Not Found!"});
      return;
    };
    // sequel updates tag data
    await Tag.update(req.body,{
      where:{
        id: req.params.id
      }
    });
    // sends back success message
    res.status(200).json({message:`Tag Updated to: ${req.body.tag_name}`});

  // catches and returns error
  } catch(err) {

    res.status(400).json(err);
  }

});

router.delete('/:id', async (req, res) => {

  // try-catch statement to delete a tag by id
  try {
    const deletedTag = await Tag.findByPk(req.params.id);
    // if tag is not found
    if (!deletedTag) {
      res.status(404).json({message:"Tag Not Found!"});
      return;
    };
    // sequel deletes tag by id
    await Tag.destroy({
      where:{
        id: req.params.id
      }
    })
    // sends success message back
    res.status(200).json({message: `Deleted Tag: ${deletedTag.tag_name}`})

  // catches and returns error
  } catch(err) {

    res.status(400).json(err);
  }
});

module.exports = router;
