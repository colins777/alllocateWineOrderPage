export const getProducerIndexInArray  = (producersData, producerId) => {
    let producerIndexInner = null;
    producersData.map((producerItem, index) => {
        if (producerItem.id === producerId) producerIndexInner = index;
    });
    return producerIndexInner;
};
