const Product = require('../models/product');
const cart= require('../models/cart');
const { fileLoader } = require('ejs');

exports.getProducts = (req, res, next) => {
  Product.findAll().then(data=>{

    res.render('shop/product-list', {
      prods: data,
      pageTitle: 'All Products',
      path:'/products'
    });
  })
  .catch(err=>console.log(err))
 /*
   Product.fetchAll().then(([row , fielData])=>{
    res.render('shop/product-list', {
      prods: row,
      pageTitle: 'All Products',
      path:'/products'
    });
   })
   .catch(err=>console.log(err))
 */
};

exports.getProduct=(req, res)=>{
  const probId=req.params.productId;
  Product.findByPk(probId)
  .then(data=>{
    
    res.render('shop/product-detail',{
      product:data,
      pageTitle:data.title,
      path:'/products'
    })
  })
  .catch(err=>console.log(err))
 
}

exports.getIndex = (req, res, next) => {
 Product.findAll().then(resutl=>{
  res.render('shop/index', {
    prods: resutl,
    pageTitle: 'Shop',
    path: '/'
  });
 })
 .catch(err=>console.log(err))

  /*
  Product.fetchAll().then(([row, fileData])=>{
    res.render('shop/index', {
      prods: row,
      pageTitle: 'Shop',
      path: '/'
    });
  })
  .catch(err=>console.log(err))*/
};

exports.getCart = (req, res, next) => {
  cart.getCart(carts=>{
    Product.fetchAll(products=>{
      const cartproducts=[];
      for(product of products){
        const cartProductData=carts.products.find(prob=>prob.id===product.id)
      if(cartProductData){
        cartproducts.push({productData:product, qty:cartProductData.qty})
         }
      }
      res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart',
        products :cartproducts,
        totalPrice:carts.totalPrice
      });
    })
  })
};

exports.postcart=(req, res)=>{
  const probId=req.body.productId;
  Product.findById(probId, (product)=>{
    cart.addProduct(probId, product.price)
  })
  res.redirect('/cart');
}

exports.postCartDeleteItem=(req, res)=>{
  const ProductId=req.body.productId;
  Product.findById(ProductId, product=>{
    cart.deleteProduct(product.id, product.price)
    res.redirect('/cart')
  })
}

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};
