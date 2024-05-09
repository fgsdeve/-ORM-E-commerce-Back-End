// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Products belongsTo Category
Product.beLongTo(Category, {
  foreignKey: 'category_id',
});

// Categories have many Products
Product.hasMany(Category,{
  foreignKey: 'category_id',
});

// Products belongToMany Tags (through ProductTag)
Product.beLongToMany(Category,{
  through: ProductTag,
  foreignKey: 'category_id',
})

// Tags belongToMany Products (through ProductTag)
Tag.beLongToMany(Product, {
  through: ProductTag,
  foreignKey : 'tag_id',
});

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
