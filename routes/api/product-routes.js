const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

// get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.findAll({
      include: [
        {
          model: Category,
          attributes: ['id', 'category_name']
        },
        {
          model: Tag,
          attributes: ['id', 'tag_name'],
          through: { attributes: [] } //  The through option allows me to specify the name of this intermediary table.
        }
      ]
    });
    res.status(200).json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// get one product
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id, {
      include: [
        {
          model: Category,
          attributes: ['id', 'category_name']
        },
        {
          model: Tag,
          attributes: ['id', 'tag_name'],
          through: { attributes: [] } // this will exclude the product attributes from results
        }
      ]
    });
    if (!product) {
      res.status(404).json({ message: 'Product not found :(' });
      return;
    }
    res.status(200).json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// create new product
router.post('/', async (req, res) => {
  try {
    const product = await Product.create(req.body);

    if(req.body.tagIds && req.body.tagIds.length) {
      const productTagIdArr = req.body.tagIds.map((tag_id) => {
        return{
          product_id: product.id,
          tag_id,
        };
      });
      await Product.bulkCreate(productTagIdArr);// bulkCreat will allow me to insert mutiple records in a single query
    }

    res.status(201).json(product);
  }catch(err) {
    console.error(err);
    res.status(400).json(err);
  }
 
});

// update product
router.put('/:id', async (req, res) => {
   try{
  await Product.update(req.body, {
    where: {
      id: req.params.id,
    },
  });

    if (req.body.tagIds && req.body.tagIds.length) {
      const existingProductTags = await ProductTag.findAll({
          where: { product_id: req.params.id }
        });
          // create filtered list of new tag_ids
      const productTagIds = existingProductTags.map(({ tag_id }) => tag_id);
      const newProductTags = req.body.tagIds
      .filter((tag_id) => !productTagIds.includes(tag_id))
      .map((tag_id) => {
          return {
              product_id: req.params.id,
              tag_id,
     };
  });

      const productTagsToRemove = existingProductTags
          .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
          .map(({ id }) => id);
    // run both actions
          await Promise.all([
            ProductTag.bulkCreate(newProductTags),
            ProductTag.destroy({ where: { id: productTagsToRemove } })
          ]);
        }
    res.status(200).json({message: "Product updated successfully"});
  }catch(err){
    console.error(err);
    res.status(400).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try{
    const product = await Product.findByPk(req.params.id);
    if(!product) {
      res.status(404).json({message: 'Product not found...'});
      return;
    }
    await product.destroy({
      where: {id: req.params.id}
    });

    res.status(200).json({message:'Product deleted successfully'});
  }catch(err){
    console.error(err);
    res.status(500).json({message:'Internal server error'});
  }
  
});

module.exports = router;
