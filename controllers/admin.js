const Product = require('../models/products');
const { getProductsCategoryWise, selectedItem, selectedCategory, selectedPrice, updateProductWithtruncated } = require('../Utils/library');

module.exports.getAdminDashboard = async (req,res,next)=>{
    try{
        res.render('admin/home')
    }
    catch(err){
        res.status(500).send({error:err.message});
    }
}

module.exports.postProductsAdd = async (req,res,next)=>{
    const {name, price,description,category,imageUrl,seller} = req.body;

    try{
        let products = await Product.create({
            name,
            price,
            description,
            category,
            imageUrl,
            seller
        })
        // res.status(201).send(products);
        res.status(201).redirect('/admin/products/all');
        // res.render('admin/add-Product',{products})
    }
    catch (err) {
        res.status(500).send({ error: err.message }); // Handle potential errors
    }

// res.send('/admin/products/all')
}

module.exports.getProductsAll = async (req, res, next) => {
    try {
        const products = await Product.find();
            
        // Add truncatedDescription and truncatedName to each product
        let updatedProducts = updateProductWithtruncated(products)

 
        // categories all products categorywise
        let data = getProductsCategoryWise(updatedProducts)

        // when selects Categories and Price from Dropdown
        let uniqueCategories = selectedCategory(updatedProducts)
        let uniquePrices = selectedPrice(updatedProducts)

        res.render('admin/products-list', { updateProduct: updatedProducts,products: data, uniqueCategories , uniquePrices});
        // res.render('admin/products-list', { products: data });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};


module.exports.getProductsAdd = (req,res,next)=>{
    res.render('admin/add-Product')
}

module.exports.getProductsUpdate =async (req,res,next)=>{
    const idParams = req.params.id;
    // res.send(`Update Ready with id : ${id}`)
    try{
        const product = await Product.findById(idParams)
        res.render('admin/update-product',{
            product
        })
    }
    catch(err){
        res.status(500).send({ error: err.message });
    }
}

module.exports.postProductUpdate = async (req,res,next)=>{
    const {name, price, description, category, seller, imageUrl, id} = req.body;
    try{
        let p = await Product.findById(id);
        p.name = name;
        p.price = price;
        p.description = description;
        p.category = category;
        p.seller = seller;
        p.imageUrl = imageUrl;
        
        await p.save();
        res.redirect('/admin/products/all')
    }
    catch(err){
        res.status(500).send({error: err.message})
    }
}

module.exports.getProductsDelete = async(req,res,next)=>{
    const idParams = req.params.id;
    try{
        await Product.findByIdAndDelete(idParams);
        res.redirect('/admin/products/all')
    }
    catch(err){
        res.status(500).send({error: err.message})
    }
}

