import React, {useEffect, useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import './ChangeQuantity.scss'
import {
    addProdPriceInTotalCost, getProducers,
    minusProdPriceInTotalCost,
    setOfferedQty
} from "../../redux/features/producers/producersSlice";
import {setRestProduct} from "../../redux/features/changeQuantity/changeQuantitySlice";


const ChangeQuantity = ({productDataAction}) => {
    const dispatch = useDispatch();

    const offeredProdQty =
        useSelector(state => state.producersData.producers[productDataAction.producerIndex].products[productDataAction.productIndex].offered)

    const maxProductQty =
        useSelector(state => state.producersData.producers[productDataAction.producerIndex].products[productDataAction.productIndex].available)

    //console.log('ChangeQuantity productDataAction', maxProductQty)

    const setRestProductHandler = () => {
        dispatch(setRestProduct())
    }

    const minusProductClickHandler = () => {
         dispatch(minusProdPriceInTotalCost(productDataAction))
    };

    const addProductClickHandler = () => {
        dispatch(addProdPriceInTotalCost(productDataAction))

    };

    const setOfferedQtyHandler = (qty) => {
        const actionData = {...productDataAction, 'offered_qty' : +qty }
            dispatch(setOfferedQty(actionData))
    };

    //@TODO add calculating total product qty of product with same ID in allProductsRestQty


    return (
        <div className="requested-edit">
            <button disabled={offeredProdQty <= 0 ? 'disabled' : ''}
                    className={offeredProdQty <= 0 ? 'disabled' : ''}
                    onClick={(e) => {e.preventDefault(); minusProductClickHandler (); setRestProductHandler()}}
            >-
            </button>
            <input type="number"
                   className="requested-input"
                   name={'qty_input[' + productDataAction.product_id + '][' + productDataAction.producerId + ']'}
                   value={offeredProdQty}
                   onChange={(e) => setOfferedQtyHandler(e.target.value)}
            />

            <button
                onClick={(e) => {e.preventDefault(); addProductClickHandler ()}}
                className={offeredProdQty === maxProductQty ? 'disabled' : ''}
                disabled={offeredProdQty === maxProductQty ? 'disabled' : ''}
            >
                +
            </button>
        </div>
    )
};

export default ChangeQuantity;