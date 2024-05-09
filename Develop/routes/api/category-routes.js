const router = require('express').Router();
const { model, where } = require('../../config/connection');
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
    const categories = await Category.findAll({
      include: [{ model: Product}],
    });
    res.status(200).json(categories);
  }catch(err) {
    console.error(err);
    res.status(500).json(err);
  }
});
  // find one category by its `id` value
  // be sure to include its associated Products
router.get('/:id', async (req, res) => {
  try{
    const category = await Category.findByPk(req.params.id, {
      include:[{model: Product}],
    });
    if(!category) {
      res.status(404).json({message: 'Category not found'});
      return;
    }
    res.status(200).json(category);
  }catch(err) {
    console.error(err);
    res.status(500).json(err);
    
  }
});

 // create a new category
router.post('/', async (req, res) => {
  try{
    const newCategory = await Category.create(req.body);
    res.status(201).json(newCategory);
  }catch(err) {
    console.error(err);
    res.status(400).json(err);
  }
 
});

// update a category by its `id` value
router.put('/:id', async (req, res) => {
  try{
    const Updatecategory = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!Updatecategory[0]) {
      res.status(404).json({message:'Category not found'});
      return;
    }
    res.status(200).json({message:'Category updated successfully'});
  }catch(err){
    console.error(err);
    res.status(400).json(err);
  }
});

 // delete a category by its `id` value
router.delete('/:id', async (req, res) => {
  try{
    const deleteCategory = await Category.destroy({
      where: {
        id: res.params.id,
      },
    });
    if(!deleteCategory) {
      res.status(404).json({message: 'Category not found'});
      return;
    }
    res.status(200).json({message: 'Category deleted successfully'});
  }catch(err){
    console.error(err);
    res.status(500).json(err);
  }
});

module.exports = router;
