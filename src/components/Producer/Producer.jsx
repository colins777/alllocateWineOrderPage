import React from "react";
import "./Producer.scss"
import Product from "../Product/Product";
import {useSelector} from "react-redux";

const Producer = function ({producerData, producerId, currency}) {

  //  console.log('producerData', producerData)

    return (
        <div>
            <div className="producer-actions">
                <div className="left-side">

                    <label htmlFor="" className="producer-all-check">
                        <input type="checkbox" className="form-control"/>
                    </label>

                    <div className="text">
                        <span className="title">Requested producer</span>
                        <span className="producer-name">{producerData.name}</span>
                    </div>
                </div>

                <div className="right-side">
                    <div className="accept">
                        <span>Your decision</span>
                        <div className="radio-buttons">
                            <label htmlFor="accept">
                                <span className="title">Accept</span>
                                <input type="radio" id="accept" name="accept_decline" value="1"/>
                            </label>

                            <label htmlFor="decline">
                                <span className="title">Decline</span>
                                <input type="radio" id="decline" name="accept_decline" value="0"/>
                            </label>

                        </div>
                    </div>
                </div>
            </div>

            <div className="producer-table-titles">
                <div className="left-side">
                    Item
                </div>

                <div className="right-side">
                    <span className="requested table-cell">Requested</span>
                    <span className="offered table-cell">Offered</span>
                    <span className="total table-cell">Total</span>
                </div>
            </div>

            { producerData.products && producerData.products.map((product, index) => (
                <Product productData={product}
                         producerId={producerId}
                         key={index}
                        currency={currency}
                />
            ))
            }
        </div>

   )
}

export default Producer