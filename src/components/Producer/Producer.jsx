import React from "react";
import "./Producer.scss"
import Product from "../Product/Product";
import {setAcceptDeclineProducts, setCheckedAllProducerProducts} from "../../redux/features/producers/producersSlice";
import {useSelector, useDispatch} from "react-redux";

const Producer = function ({producerData, producerId, currency}) {

    const dispatch = useDispatch();

    const producersList = useSelector((state) => {
        return state.producersData.producers
    });

    const getProducerIndex = function () {
        let producerIndexInner = null;
        //console.log('producerData', producerData)

        producersList.map((producer, index) => {
            if (producer.id === producerId) producerIndexInner = index;
        });
        return producerIndexInner;
    };

    const productDataAction = {
         producerId,
        'producerIndex': getProducerIndex(),
    };

    const acceptDeclineHandler = (value) => {
        const dataAcceptDecline = {...productDataAction, 'acceptDecline' : +value}
        dispatch(setAcceptDeclineProducts(dataAcceptDecline))
    };

    const productsDeclined = useSelector((state) => {
        return state.producersData.producers[getProducerIndex()].declined;
    });

    const checkAllProducerProductsHandler  = (value) => {
      console.log('checkAllProducerProductsHandler:', value)

        const actionData = {...productDataAction, 'producer_checked' : +value }

        dispatch(setCheckedAllProducerProducts(actionData))
    };

    return (
        <div>
            <div className="producer-actions">
                <div className="left-side">

                    <label htmlFor="" className="producer-all-check">
                        <input type="checkbox"
                               className="form-control"
                               name={'[producer_id][' + producerData.id +'][check_all_producer_products]'}
                               value={producerData.checked}
                               checked={producerData.checked}
                               disabled={productsDeclined ? 'disabled' : ''}
                               onChange={(e) => checkAllProducerProductsHandler(e.target.value)}
                        />
                    </label>

                    <div className="text">
                        <span className="title">Requested producer</span>
                        <span className="producer-name">{producerData.name}</span>
                    </div>
                </div>

                <div className="right-side">
                        <span className="decision">Your decision</span>
                        <div className="radio-buttons">
                            <div className="label-wrap">
                                <label htmlFor="accept">
                                    <span className="title">Accept</span>
                                    <input type="radio"
                                           id="accept"
                                           name={'producer_id[' + producerData.id +'][accept_decline]'}
                                           value="1"
                                          checked={!productsDeclined ? 'checked' : ''}
                                           onChange={ (e) => acceptDeclineHandler(e.target.value)}
                                    />
                                </label>
                            </div>

                            <div className="label-wrap">
                                <label htmlFor="decline">
                                    <span className="title">Decline</span>
                                    <input type="radio"
                                           id="decline"
                                           name={'producer_id[' + producerData.id +'][accept_decline]'}
                                           value="0"
                                           checked={productsDeclined ? 'checked' : ''}
                                           onChange={ (e) => acceptDeclineHandler(e.target.value)}
                                    />
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