import React from "react";
import {useSelector, useDispatch} from "react-redux";
import {
    addProdPriceInTotalCost,
    minusProdPriceInTotalCost,
    setOfferedQty
} from "../../redux/features/producers/producersSlice";


const ChangeQuantity = ({offeredQty, productDataAction}) => {

    const offeredProdQty =
        useSelector(state => state.producersData.producers[productDataAction.producerIndex].products[productDataAction.productIndex].offered)

    const dispatch = useDispatch();

    console.log('ChangeQuantity productDataAction', productDataAction)

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
            <button disabled={offeredQty <= 0 ? 'disabled' : ''}
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
                onClick={(e) => {e.preventDefault(); addProductClickHandler (e.target.value)}}
            >
                +
            </button>
        </div>
    )
};

export default ChangeQuantity;