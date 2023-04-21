const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render( 'admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing:false
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrlproduct = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product= new Product( null,title, imageUrlproduct, description, price);
  product.save();
  res.redirect('/');
};


exports.getEditProduct = (req, res, next) => {
  const editMode=req.query.edit;
  if(!editMode){
   return res.redirect('/');
  }
const probId=req.params.productId;

Product.findById(probId, product=>{

  if(!product){
    res.redirect('/');
  }
  res.render( 'admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/edit-product',
  editing:editMode,
  product:product
  });
})
  
};

exports.postEdit=(req, res, next)=>{
  const updateId=req.body.id;
  const updatetitle = req.body.title;
  const updaturl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product= new Product( updateId,updatetitle, updaturl, description, price);
  product.save();
 res.redirect('/');
}


exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
  });
};

exports.postDelet=(req, res)=>{
 const proId=req.body.produtId
 Product.deletById(proId)
 res.redirect('/admin/products')
}