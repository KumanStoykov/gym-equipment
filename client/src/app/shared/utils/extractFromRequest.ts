export function extractFromRequest(data: any) {
    let currentPrefix = '';

    if (data.productType === 'rack' || data.productType === 'benches' || data.productType === 'dumbbell') {
        currentPrefix = `/strength/${data.productType}`;
    } else {
        currentPrefix = data.productType;
    }

    return {
        _id: data._id,
        brand: data.brand,
        images: data.images,
        quantity: 0,
        price: Number(data.price),
        promoPrice: Number(data.promoPrice),
        productType: data.productType,
        urlPrefix: currentPrefix
    }
}
