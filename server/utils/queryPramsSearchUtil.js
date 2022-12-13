
exports.queryParamsSearch = (query) => {
    const search = {};

    if (query.priceFrom && !query.priceTo) {
        search.currentPrice = { $gte: query.priceFrom };
    } else if (query.priceTo && !query.priceFrom) {
        search.currentPrice = { $lte: query.priceTo };
    } else if (query.priceFrom && query.priceTo) {
        search.currentPrice = { $gte: query.priceFrom, $lte: query.priceTo }
    }
    if (query.brands && query.brands.length > 0) {
        const brands = query.brands.split(',');
        if (brands.length > 0) {
            search.brand = { $in: brands }
        }
    }
    if (query.product && query.product.length > 0) {
        const brands = query.product.split(',');
        if (brands.length > 0) {
            search.productType = { $in: brands }
        }
    }

    return search
}