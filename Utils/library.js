module.exports.updateProductWithtruncated = function (products){
    const maxDescLength = 50;
        const maxNameLength = 20;
        const updatedProducts = products.map(product => {
            return {
                ...product.toObject(),
                truncatedDescription: product.description.length > maxDescLength ? product.description.substring(0, maxDescLength) + '...' : product.description,
                truncatedName: product.name.length > maxNameLength ? product.name.substring(0, maxNameLength) + '...' : product.name
            };
        });
        return updatedProducts;
}

module.exports.getProductsCategoryWise = function (updatedProducts){
    let data = {}
        updatedProducts.forEach((product) => {
            let arr = data[product.category] || [];
            arr.push(product);
            data[product.category] = arr
        })

        return data;
}

module.exports.selectedCategory = function (updatedProducts){
    const uniqueCategories = [...new Set(updatedProducts.map(uProduct => {
            return uProduct.category
        }))];
        return uniqueCategories;
}

module.exports.selectedPrice = function (updatedProducts){
    const uniquePrices = [...new Set(updatedProducts.map(uProduct => {
            return uProduct.price
        }))];
        return uniquePrices;
}