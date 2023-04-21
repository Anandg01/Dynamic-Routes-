const Product = require('../models/product');
const cart= require('../models/cart');
exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All Products',
      path:'/products'
    });
  });
};

exports.getProduct=(req, res)=>{
  const probId=req.params.productId;
  Product.findById(probId, product=>{
    res.render('shop/product-detail',{
    product:product,
    pageTitle:product.title,
    path:'/products'
  })
  })
}

exports.getIndex = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('shop/index', {
      prods: products,
      pageTitle: 'Shop',
      path: '/'
    });
  });
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
