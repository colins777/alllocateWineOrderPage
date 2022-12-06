import React, {useRef, useState} from "react";
import "./Product.scss";
import {addProdPriceInTotalCost, minusProdPriceInTotalCost, setOfferedQty, setProductChecked} from "../../redux/features/producers/producersSlice"
import {useDispatch, useSelector} from "react-redux";
import {setShowAddressModal} from "../../redux/features/addressModal/addressModalSlice";

const Product = function ({productData, producerId, currency}) {
    const dispatch = useDispatch();

    const offeredQty = productData.offered;
    const producerData = useSelector((state) => {
        return state.producersData.producers
    });

    const productChecked = productData.checked;

    //save producer index for send to action object for change state
    //state.producers[producerIndex].products[0].total_sum = 1
    const getProducerIndex = function () {
       let producerIndexInner = null;
       producerData.map((producer, index) => {
          // console.log('producer map', producer)
          // console.log('producer map', index)
            if (producer.id === producerId) producerIndexInner = index;
        });
       return producerIndexInner;
    };

    const getProductIndex = function () {
        let productIndexInner = null;
        let producerIndexInner = getProducerIndex();
        producerData[producerIndexInner].products.map((product, index) => {
            if (product.id === productData.id) productIndexInner = index;
        })
        return productIndexInner;
    };

    const productDataAction = {
        'product_id': productData.id,
        'price': productData.price,
        'producerIndex': getProducerIndex(),
        'productIndex': getProductIndex(),
        'offered_qty': productData.offered,
        producerId,
        product_checked: productData.checked,
    };


    const productDeclined = useSelector((state) => {
        return state.producersData.producers[productDataAction.producerIndex].products[productDataAction.productIndex].declined;
    });

    const addProductClickHandler = (inputValue) => {
        dispatch(addProdPriceInTotalCost(productDataAction))

    };

    const minusProductClickHandler = () => {
        dispatch(minusProdPriceInTotalCost(productDataAction))
    };

    const setOfferedQtyHandler = (qty) => {
        const actionData = {...productDataAction, 'offered_qty' : +qty }
        dispatch(setOfferedQty(actionData))
    };

    const setCheckedProductHandler = (value) => {
        const actionData = {...productDataAction, 'product_checked' : +value }
        dispatch(setProductChecked(actionData))
    };

    //Address modal
    const showAddressModal = useSelector((state) => {return state.addressModalData.modalShow});
    const producersList = useSelector((state) => {
        return state.producersData.producers
    });
    const dataForAddressModal = {'producers': producersList, 'modalShow' : !showAddressModal}
    const showAddressModalHandler = () => {
        //send the arr of products IDs, IDs get from state if product checked
        dispatch(setShowAddressModal(dataForAddressModal))
    };


   // console.log('totalCost', totalCost)
    //console.log('productData', productData)
    return (
        <div className="product-item">
            <div className="product-checkbox">
                <label htmlFor=""  className="filter checkbox-container" >
                    <input type="checkbox"
                           className="form-control"
                           name={'[producer_id][' + producerId + '][product_id][' + productData.id + '][product_checked]'}
                           value={productChecked}
                           checked={productChecked}
                           onChange={(e) => setCheckedProductHandler(e.target.value)}
                           disabled={productDeclined ? 'disabled' : ''}
                    />
                    <span className="checkmark"></span>
                </label>
            </div>


            <div className="image">
                <img src={productData.img} alt={productData.name}/>
            </div>
            
            <div className="descr table-cell">
                <h4 className="name">{productData.name}</h4>
                <span className="pack">{currency}{productData.price} / {productData.price_per_pack}</span>

                <div className={productDeclined ? 'delivery-wrap hide' : 'delivery-wrap'}>
                    <span className="option-title">Delivery option:</span>
                    <div className="delivery-option-block">
                        <span className="text option-title">Store with Burgundy Wine Bond - 1 qty</span>
                        <a className="edit-btn"
                           onClick={() => showAddressModalHandler()}
                        >
                            Edit
                        </a>
                    </div>
                </div>


            </div>

            <span className="requested table-cell">
                {productData.requested}
            </span>

            <span className={!productDeclined ? 'offered table-cell' : 'offered table-cell declined'}>
                {productData.offered_allow_edit && !productDeclined ?
                    (<div className="requested-edit">
                        <button disabled={offeredQty <= 0 ? 'disabled' : ''}
                            onClick={(e) => {e.preventDefault(); minusProductClickHandler ()}}
                        >-
                        </button>
                        <input type="number"
                               className="requested-input"
                               name={'[producer_id][' + producerId + '][product_id][' + productData.id + '][offered_input]'}
                               value={offeredQty}
                               onChange={(e) => setOfferedQtyHandler(e.target.value)}
                        />

                        <button
                            onClick={(e) => {e.preventDefault(); addProductClickHandler (e.target.value)}}
                        >
                            +
                        </button>
                    </div>)
                    : offeredQty
                }
            </span>

            <div className="total table-cell">
                {currency} {productData.total_sum}
            </div>
            <input type="hidden"
                   name={'[producer_id][' + producerId + '][product_id][' + productData.id + '][product_declined]'}
                    value={productDeclined}
            />
        </div>
    )
}

export default Product;