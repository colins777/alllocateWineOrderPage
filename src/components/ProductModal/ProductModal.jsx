import React, {useState} from "react";
import ChangeQuantity from "../ChangeQuantity/ChangeQuantity";
import {useSelector} from "react-redux";

export const ProductModal = ({product, showChangeQty}) => {

    const producersData = useSelector((state) => state.producersData.producers);

    //console.log('producersData', producersData)

    const getProducerIndex = function () {
        let producerIndexInner = null;
        producersData.map((producer, index) => {
            if (producer.id === product.producer_id) producerIndexInner = index;
        });
        return producerIndexInner;
    };

    const getProductIndex = function () {
        let productIndexInner = null;
        let producerIndexInner = getProducerIndex();
        producersData[producerIndexInner].products.map((product_all, index) => {
            if (product_all.id === product.id) productIndexInner = index;
        })
        return productIndexInner;
    };

    const productDataAction = {
        'product_id': product.id,
        'price': product.price,
        'producerIndex': getProducerIndex(),
        'productIndex': getProductIndex(),
        'offered_qty': product.offered,
        'producerId': product.producer_id,
        'product_checked': product.checked
    };

    return (
        <div className="product">
            <div className="r-row">
                <div className="left">
                    {/*<span className="producer-name">{product.producer_name}</span>*/}
                    <span className="producer-name">{product.name}</span>
                    <div className="bottom-spec">
                        <span className="spec">Total: {product.offered}</span>
                        <span className="spec">Available: {product.available}</span>
                        <span className="spec">Assigned: 2</span>
                    </div>
                </div>
                <div className="offered">
                    {showChangeQty ?
                        <ChangeQuantity
                            offeredQty={product.offered}
                            productDataAction={productDataAction}
                        />
                        :
                        <span className="not-editing">{product.offered}</span>
                    }
                </div>
            </div>
        </div>
    )
}