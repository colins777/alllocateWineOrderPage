export const getProductIndexInArray  = (producersData, producerIndexInner, productId) => {
    let productIndexInner = null;
    producersData[producerIndexInner].products.map((product_all, index) => {
        if (product_all.id === productId) productIndexInner = index;
    })
    return productIndexInner;
};