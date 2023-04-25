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
  Product.create({
    title:title,
    price:price,
    imageUrl:imageUrlproduct,
    description:description
  }).then(result=>{
  console.log('Post Created Done')
  res.redirect('/')
})
  .catch(err=>console.log(err))
};

exports.getEditProduct = (req, res, next) => {
  const editMode=req.query.edit;
  if(!editMode){
   return res.redirect('/');
  }
const probId=req.params.productId;

Product.findByPk(probId)
.then(product=>{

  if(!product){
    res.redirect('/');
  }
  res.render( 'admin/edit-product', {
    pageTitle: 'Edit Product',
    path: '/admin/edit-product',
  editing:editMode,
  product:product
  });
})
.catch(err=>console.log(err))
  
};

exports.postEdit=(req, res, next)=>{
  const updateId=req.body.id;
  const updatetitle = req.body.title;
  const updaturl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;

  Product.findByPk(updateId)
  .then(product=>{
    product.title=updatetitle;
    product.imageUrl=updaturl;
    product.description=description;
    product.price=price;
   return product.save()
  })
  .then(result=>{
    console.log("updated Record")
    res.redirect('/');
})
  .catch(err=>console.log(err))

}


exports.getProducts = (req, res, next) => {

  Product.findAll()
  .then(result=>{
    res.render('admin/products', {
      prods: result,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
  })
  .catch(err=>console.log(err))

  /*
  Product.fetchAll()
  .then(([row, fieldData])=>{
    res.render('admin/products', {
      prods: row,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
  })
  .catch(err=>console.log(err))
  */
};

exports.postDelet=(req, res)=>{
 const proId=req.body.produtId

Product.findByPk(proId)
.then((product)=>{
return product.destroy();
}).then(()=>{
  console.log('destroy record...')
  res.redirect('/admin/products')
})
 /*
 Product.deletById(proId).then(()=>{
  res.redirect('/admin/products')
 })*/
 .catch(err=>console.log(err))
}