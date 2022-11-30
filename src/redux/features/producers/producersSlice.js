import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    producers: [],
    currency: null,
    subtotal: 0,
    shipping_cost: 0,
    storage_fee: 0,
    total_cost : 0,
    loading: true,
};

export const getProducers = createAsyncThunk(
    'producers/getProducers',
    async (_, {rejectWithValue, dispatch} ) => {
        try {
            const {data} = await axios.get('http://localhost:3004/allocateData')

            console.log('producers slice', data)
            //return data.producers;
            return data;


        } catch (e) {
            console.log('getProducers Error: ', e)
        }
    }
);

export const producersSlice = createSlice({
    //slice name
    name: 'producers',
    //initial state
    initialState,
    //object reducer with actions
    reducers: {
        //action setProducers
        setProducers: (state, action) => {
            state.producers = action.payload
        },
        setCurrency: (state, action) => {
           state.currency = action.payload
            console.log('state.currency', action)
            //state.currency = action.currency
        },
        setSubtotal: (state, action) => {
            state.subtotal = action.payload
        },
        setShippingCost: (state, action) => {
            state.shipping_cost = action.payload
        },
        setStorageFee: (state, action) => {
            state.storage_fee = action.payload
        },
        setTotalCost: (state, action) => {
           // state.total_cost = state.total_cost + action.payload
            state.total_cost = action.payload
        },
        addProdPriceInTotalCost: (state, action) => {
           //console.log('currentState', state.producers)
            state.total_cost = state.total_cost + action.payload.price;
            state.producers[action.payload.producerIndex].products[action.payload.productIndex].total_sum
                += state.producers[action.payload.producerIndex].products[action.payload.productIndex].price;

            //console.log('action.payload', action.payload)
            state.producers[action.payload.producerIndex].products[action.payload.productIndex].offered
                += 1

            state.subtotal += state.producers[action.payload.producerIndex].products[action.payload.productIndex].price
        },
        minusProdPriceInTotalCost: (state, action) => {
            const producerIndex = state.producers[action.payload.producerIndex];
            const productIndex = producerIndex.products[action.payload.productIndex];

            state.total_cost = state.total_cost - action.payload.price;
            productIndex.total_sum
                -= productIndex.price;
            //minus 1 item
            productIndex.offered -= 1;
            state.subtotal -= productIndex.price
        },
        setOfferedQty : (state, action) => {
            //change offered qty
            state.producers[action.payload.producerIndex].products[action.payload.productIndex].offered =
                action.payload.offered_qty;
            //total sum of current product
            state.producers[action.payload.producerIndex].products[action.payload.productIndex].total_sum =
                action.payload.offered_qty * state.producers[action.payload.producerIndex].products[action.payload.productIndex].price;
            //Total sum of all products
            state.total_cost += action.payload.offered_qty * state.producers[action.payload.producerIndex].products[action.payload.productIndex].price
            state.subtotal += action.payload.offered_qty * state.producers[action.payload.producerIndex].products[action.payload.productIndex].price
        },

        setProductChecked: (state, action) => {
            //console.log('action', action)
            state.producers[action.payload.producerIndex].products[action.payload.productIndex].checked = action.payload.product_checked
        },

        //Producer Accept/Decline
        setAcceptDeclineProducts: (state, action) => {

            //decline
/*            let producerProdSumArr = [];
            state.producers.map((producer) => {
                    producer.products.map((product, index) => {
                            console.log('product', product.price * product.offered)
                        producerProdSumArr.push(product.price * product.offered)
                    })
            });
            let totalCostAllProducts = producerProdSumArr.reduce((acc, current) => {
                return acc + current;

            });
            console.log('totalCostAllProducts', totalCostAllProducts);*/


           // if (state.producers[[action.payload.producerIndex]].declined !== null) {
                if (action.payload.acceptDecline === 0) {
                    let productsDeclinedSum = 0;
                    state.producers[action.payload.producerIndex].products.map((product, index) => {

                        const currentProduct = state.producers[action.payload.producerIndex].products[index];
                        productsDeclinedSum += currentProduct.total_sum;
                        currentProduct.total_sum = 0;
                        currentProduct.declined = true;

                    });
                    state.producers[action.payload.producerIndex].declined = true;
                    state.subtotal = state.subtotal - productsDeclinedSum;

                    //check if all declined
                    let producersQty = state.producers.length;
                    let producersDeclined = [];
                    state.producers.map((producer, index) => {
                        if (producer.declined) {
                            producersDeclined.push('declined')
                        }
                    })

                    if (producersQty === producersDeclined.length) {
                        state.total_cost = 0;
                    } else {
                        state.total_cost = state.total_cost - productsDeclinedSum;
                    }

                } else {
                    //Accepted
                    //@TODO not calculating correct total sum after switching from Decline, not added storage_fee, shipping +
                    //@TODO uncorrect calculating total sum if radio buttons not setted
                    let productsAcceptedSum = 0;
                    state.producers[action.payload.producerIndex].products.map((product, index) => {
                        const currentProduct = state.producers[action.payload.producerIndex].products[index];

                        productsAcceptedSum += currentProduct.price *
                            currentProduct.offered;

                        currentProduct.total_sum =
                            currentProduct.price *
                            currentProduct.offered;
                        currentProduct.declined = false;
                    });

                    state.producers[action.payload.producerIndex].declined = false;
                    state.subtotal = state.subtotal + productsAcceptedSum;
                    //state.total_cost = state.total_cost + state.shipping_cost + state.storage_fee;
                    //state.total_cost = state.total_cost + productsAcceptedSum;
                    state.declined = false;
                }
          //  state.total_cost = state.total_cost  + state.shipping_cost + state.storage_fee;
          //  }

            let producerProdSumArr = [];
            state.producers.map((producer) => {
                producer.products.map((product) => {
                    if (!product.declined) {
                        //console.log('product', product.price * product.offered)
                        producerProdSumArr.push(product.price * product.offered)
                    }
                })
            });

            if (producerProdSumArr.length) {
                let totalCostAllProducts = producerProdSumArr.reduce((acc, current) => {
                    return acc + current;
                });
                console.log('totalCostAllProducts', totalCostAllProducts);
                state.total_cost = totalCostAllProducts + state.shipping_cost + state.storage_fee;
            } else {
                state.total_cost = 0;
            }
        },

        setDeclineAllProducts:  (state, action) => {
            console.log('setDeclineAllProducts', action)
        }
    },
    extraReducers: {
        [getProducers.pending]: (state) => {
            state.loading = true
        },
        //in fullfield we get action with data
        [getProducers.fulfilled]: (state, action) => {
                    state.producers = action.payload.producers;
                    state.currency = action.payload.currency.title;
                    state.subtotal = action.payload.offer_summary.subtotal;
                    state.total_cost = action.payload.offer_summary.total_cost;
                    state.shipping_cost = action.payload.offer_summary.shipping_cost;
                    state.storage_fee = action.payload.offer_summary.storage_fee;

                    //console.log('action.payload data', action.payload);
                    state.loading = false

            console.log('payload Back', action.payload)
        },
        [getProducers.rejected]: (state) => {
            state.loading = false
        }
    },
    // extraReducers: (builder) => {
    //     builder.addCase(getProducers.fulfilled,  (state, action) => {
    //         state.producers = action.payload.producers;
    //         state.currency = action.payload.currency.title;
    //         state.total_cost = action.payload.offer_summary.total_cost;
    //         console.log('action.payload data', action.payload);
    //     },)
    // }
});
//redux saving methods in action object
export const {setCurrency, setTotalCost, addProdPriceInTotalCost, minusProdPriceInTotalCost, setOfferedQty, setProductChecked, setAcceptDeclineProducts,
    setDeclineAllProducts
} = producersSlice.actions

export default producersSlice.reducer