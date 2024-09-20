const Product = require('../models/products');
const { getProductsCategoryWise, selectedItem, selectedCategory, selectedPrice, updateProductWithtruncated } = require('../Utils/library');

module.exports.getHomeData = async (req, res, next) => {
    try {
        const products = await Product.find();

        // Add truncatedDescription and truncatedName to each product
        let updatedProducts = updateProductWithtruncated(products);

        // Categories all products categorywise
        let data = getProductsCategoryWise(updatedProducts);

        // When selects Categories and Price from Dropdown
        let uniqueCategories = selectedCategory(updatedProducts);
        let uniquePrices = selectedPrice(updatedProducts);

        // Adding category index
        let categoriesWithIndex = uniqueCategories.map((category, index) => ({
            category,
            index
        }));

        res.render('index', {
            updateProduct: updatedProducts,
            products: data,
            uniqueCategories: categoriesWithIndex,
            uniquePrices
        });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};
