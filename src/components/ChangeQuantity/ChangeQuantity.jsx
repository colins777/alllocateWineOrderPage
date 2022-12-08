import React from "react";
import {useSelector, useDispatch} from "react-redux";
import './ChangeQuantity.scss'
import {
    addProdPriceInTotalCost,
    minusProdPriceInTotalCost,
    setOfferedQty
} from "../../redux/features/producers/producersSlice";


const ChangeQuantity = ({productDataAction}) => {
    const dispatch = useDispatch();

    const offeredProdQty =
        useSelector(state => state.producersData.producers[productDataAction.producerIndex].products[productDataAction.productIndex].offered)

    const maxProductQty =
        useSelector(state => state.producersData.producers[productDataAction.producerIndex].products[productDataAction.productIndex].available)

    //console.log('ChangeQuantity productDataAction', maxProductQty)

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

    return (
        <div className="requested-edit">
            <button disabled={offeredProdQty <= 0 ? 'disabled' : ''}
                    className={offeredProdQty <= 0 ? 'disabled' : ''}
                    onClick={(e) => {e.preventDefault(); minusProductClickHandler ()}}
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