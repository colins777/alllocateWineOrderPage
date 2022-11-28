import React, {useState} from "react";
import "./Product.scss";
import {addProdPriceInTotalCost, minusProdPriceInTotalCost} from "../../redux/features/producers/producersSlice"
import {useDispatch, useSelector} from "react-redux";

const Product = function ({productData, producerId, currency}) {
    const dispatch = useDispatch();
    const [requestedQty, setRequestQty] = useState('')
    const producerData = useSelector((state) => {
        return state.producersData.producers
    });

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
    }

    // console.log('producerIndex', producerIndex())
    //console.log('productData', productData)

    const productDataAction = {
        'product_id': productData.id,
        'price': productData.price,
        'producerIndex': getProducerIndex(),
        'productIndex': getProductIndex(),
        producerId,
    };

    const addProductClickHandler = () => {
        dispatch(addProdPriceInTotalCost(productDataAction))
           // console.log(productObject)
    };

    const minusProductClickHandler = () => {
        dispatch(minusProdPriceInTotalCost(productDataAction))
        // console.log(productObject)
    }

   // console.log('totalCost', totalCost)
    //console.log('productData', productData)
    return (
        <div className="product-item">
            {/*<input type="hidden" name={'producer_index ' + getProducerIndex()}/>
            <input type="hidden" name={'product_index ' + getProductIndex()}/>*/}
                <label htmlFor=""  className="checkbox" >
                    <input type="checkbox" className="form-control" name="product_[id]_checkbox"/>
                </label>

            <div className="image">
                <img src={productData.img} alt={productData.name}/>
            </div>
            
            <div className="descr table-cell">
                <h4 className="name">{productData.name}</h4>
                <span className="pack">{productData.price} {productData.price_per_pack}</span>
                <span className="option-title">Delivery option:</span>
                <div className="delivery-option-block">
                    {/*<span>{productData.delivery_option}</span>*/}
                    <span className="text option-title">Store with Burgundy Wine Bond - 1 qty</span>
                    <a className="edit-btn">Edit</a>
                </div>

            </div>

            <span className="requested table-cell">
                {productData.requested}

            </span>

            <span className="offered table-cell">
                {productData.offered_allow_edit ?
                    (<div className="requested-edit">
                        <button
                            onClick={(e) => {e.preventDefault(); minusProductClickHandler ()}}
                        >-
                        </button>
                        <input type="number"
                               className="requested-input"
                               name={'[producerId-' + producerId + '][productId-' + productData.id + ']requested-input'}
                               value={requestedQty}
                               onChange={(e) => {setRequestQty(e.target.value)}}
                        />

                        <button
                            onClick={(e) => {e.preventDefault(); addProductClickHandler ()}}
                        >
                            +
                        </button>
                    </div>)
                    : productData.requested
                }
            </span>

            <div className="total table-cell">
                {currency} {productData.total_sum}
            </div>
        </div>
    )
}

export default Product;