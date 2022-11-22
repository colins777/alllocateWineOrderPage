import React from "react";
import "./Product.scss"

const Product = function ({productData}) {

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
                <span>Delivery option:</span>
                <div className="delivery-option-block">
                    <span>{productData.delivery_option}</span>
                    <a href="#">Edit</a>
                </div>

            </div>

            <span className="requested table-cell">
                {productData.requested}
            </span>

            <span className="offered table-cell">
                {productData.offered}
            </span>

            <div className="total table-cell">
                € {productData.total_sum}
            </div>
        </div>
    )
}

export default Product;