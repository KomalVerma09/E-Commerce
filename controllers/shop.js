const Product = require("../models/products");
const Users = require("../models/user")
const mongoose = require('mongoose');
const {
  getProductsCategoryWise,
  selectedCategory,
  selectedPrice,
  updateProductWithtruncated,
} = require("../Utils/library");

module.exports.getHome = async (req, res, next) => {
  try {
    let products = await Product.find({});
    let updatedProducts = updateProductWithtruncated(products);
    let categoryWiseData = getProductsCategoryWise(updatedProducts);
    // when selects Categories and Price from Dropdown
    let uniqueCategories = selectedCategory(updatedProducts);
    let uniquePrices = selectedPrice(updatedProducts);

    console.log(req.user)

    // res.json(products);
    res.render("shop/home", {
      updateProduct: updatedProducts,
      products: categoryWiseData,
      uniqueCategories,
      uniquePrices
    });
  } catch {
    res.status(500).json({ message: "Error in fetching products" });
  } 
};

// module.exports.getProductsAll = async (req, res, next) => {
//   try {
//     const products = await Product.find();
//     // Add truncatedDescription and truncatedName to each product
//     let updatedProducts = updateProductWithtruncated(products);

//     // categories all products categorywise
//     let data = getProductsCategoryWise(updatedProducts);

//     // when selects Categories and Price from Dropdown
//     let uniqueCategories = selectedCategory(updatedProducts);
//     let uniquePrices = selectedPrice(updatedProducts);

//     // res.json(products);
//     res.render("shop/products-list", {
//       updateProduct: updatedProducts,
//       products: data,
//       uniqueCategories,
//       uniquePrices,
//     });
//   } catch {
//     res.send({ error: err.message });
//   }
// };

module.exports.getSpecificProductById =async (req,res,next)=>{
  try{
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid product ID" });
    }

    
    let product = await Product.findOne({ _id: id });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    let updatedProduct = updateProductWithtruncated([product]);
    let categoryWiseData = getProductsCategoryWise([updatedProduct]);
    // when selects Categories and Price from Dropdown
    let uniqueCategories = selectedCategory(updatedProduct);
    let uniquePrices = selectedPrice(updatedProduct);

    res.render('shop/product-details', {
      updateProduct: updatedProduct,
      product: categoryWiseData,
      uniqueCategories,
      uniquePrices
    });


  }
  catch(err){
    console.log(err);
    
    res.status(500).json({ message: "Error in fetching products" });
  }
}


module.exports.getCart= async (req,res,next)=>{
  try{
      const {id} = req.params;
      let user = await Users.findOne({_id : req.user._id}).populate('cart.id')
      let totalPrice = 0;
      user.cart.forEach((item)=>{
        totalPrice += item.id.price * item.quantity;
      })
      totalPrice = totalPrice.toFixed(2);
      res.render('shop/cartPage',{
        cart: user.cart,
        totalPrice
      })
  }
  catch{
    res.status(500).json({ message: "Error in fetching cart" });
  }
}

module.exports.getAddToCartById= async (req,res,next)=>{
  try{
    
    const { id } = req.params;
    
    let cart = req.user.cart;
    let index = -1;
    cart.forEach((item,i)=>{
      if(item.id == id){
        index = i;
      }
    });
    if(index == -1){
      cart.unshift({
        id: id,
        quantity: 1
      })
    }
    else{
      cart[index].quantity++;
    }
    // to make db change save
    await req.user.save()
    res.redirect('/shop/cartPage')
  }
  catch{
    console.error(err);
    res.status(500).json({ message: "Error in fetching cart" });
  }
}

module.exports.getIncreaseQuantity = async (req,res,next)=>{
  try{
    const { id } = req.params;
    let cart = req.user.cart;
    let index;
    cart.forEach((item,i)=>{
      if(item.id == id){
        index = i 
        }
    });
    if(index != -1){
      cart[index].quantity++;
      await req.user.save();
      
      let user = await Users.findOne({_id: req.user._id}).populate('cart.id')
      let totalPrice = 0;
      user.cart.forEach(item => {
        totalPrice += item.id.price * item.quantity
      })
      res.send({
        id: user.cart,
        totalPrice
      });
      }
  }
  catch{
    res.status(500).json({ message: "Error in fetching cart" });
  }
}
module.exports.getDecreaseQuantity = async (req,res,next)=>{
  try{
    const {id} = req.params;
    let cart = req.user.cart;
    let index = cart.findIndex(item => item.id == id);;
    
    if(index !== -1){
      if(cart[index].quantity > 1){
        cart[index].quantity--;
        }
        else{
          cart.splice(index,1);
        }
        await req.user.save();
        let user = await Users.findOne({ _id: req.user._id }).populate('cart.id');
        let totalPrice = 0;
        user.cart.forEach(item => {
          totalPrice += item.id.price * item.quantity
        })

        res.send({
          id: user.cart,
          totalPrice: totalPrice
        });
  }
  else {
    res.status(404).json({ message: "Product not found in cart" });
  }
}
  catch{
    res.status(500).json({ message: "Error in fetching cart" });
  }
}
