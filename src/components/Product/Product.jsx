import React from "react";
import "./Product.scss";
import setTotalCost from "../../redux/features/producers/producersSlice"
import {useSelector} from "react-redux";

const Product = function ({productData, producerId, currency}) {
    const totalCost = useSelector((state) => {
        //return state.producers_data.total_cost;
        return state.producersData.total_cost
    })

    console.log('totalCost', totalCost)
   // console.log('totalCost', totalCost)
    //console.log('productData', productData)
    return (
        <div className="product-item">

                <label htmlFor=""  className="checkbox" >
                    <input type="checkbox" className="form-control" name="product_[id]_checkbox"/>
                </label>

            <div className="image">
                <img src={productData.img} alt={productData.name}/>
            </div>
            
            <div className="descr table-cell">
                <h4 className="name">{productData.name}</h4>
                <span className="pack">{productData.price_per_pack}</span>
                <span className="option-title">Delivery option:</span>
                <div className="delivery-option-block">
                    {/*<span>{productData.delivery_option}</span>*/}
                    <span className="text option-title">Store with Burgundy Wine Bond - 1 qty</span>
                    <a className="edit-btn">Edit</a>
                </div>

            </div>

            <span className="requested table-cell">

                {productData.offered_allow_edit ?
                (<div className="requested-edit">
                    <button>+</button>
                    <input type="number"
                           className="requested-input"
                           name={'[producerId-' + producerId + '][productId-' + productData.id + ']requested-input'}
                    />
                    <button>-</button>
                </div>)
                : productData.requested
                }
            </span>

            <span className="offered table-cell">
                {productData.offered}
            </span>

            <div className="total table-cell">
                {currency} {productData.total_sum}
            </div>
        </div>
    )
}

export default Product;