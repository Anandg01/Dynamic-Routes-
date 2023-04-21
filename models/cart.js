const fs= require('fs');
const path= require('path');
const { isNull } = require('util');

const p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'cart.json'
  );


  
module.exports= class Cart{
    static addProduct(id, productPrice){

fs.readFile(p,(err, data)=>{
    let cart={products: [], totalPrice: 0}
    if(!err){
       cart=JSON.parse(data)
    }
const existingProductIndex=cart.products.findIndex(prob=>prob.id===id)
const existingProduct=cart.products[existingProductIndex];
let updatedProduct;
if(existingProduct){
    updatedProduct={...existingProduct}
    updatedProduct.qty=updatedProduct.qty+1;
    cart.products=[...cart.products];
    cart.products[existingProductIndex]=updatedProduct
}

else{
    updatedProduct={id: id, qty:1};
    cart.products=[...cart.products, updatedProduct]
}
cart.totalPrice=cart.totalPrice+ +productPrice
fs.writeFile(p,JSON.stringify(cart), (err)=>console.log(err))
console.log(cart)
})
    }

static deleteProduct(id, productPrice){
    fs.readFile(p, (err, data)=>{
        if(err){
            return
        }
        const updateCart={...JSON.parse(data)};
        const product=updateCart.products.find(prob=>prob.id===id)
        if(!product){
            return;
        }
        console.log(product)
        const productqty=product.qty
         updateCart.products=updateCart.products.filter(
            prob=>prob.id!==id
        );
        updateCart.totalPrice=updateCart.totalPrice-productPrice*productqty
      fs.writeFile(p,JSON.stringify(updateCart),err=>console.log(err))
    })
}

static getCart(cb){
    fs.readFile(p, (err, data)=>{
        if(err){
            cb({products: [], totalPrice: 0})
        }
        else{
            cb(JSON.parse(data))
        }
    })
}

}