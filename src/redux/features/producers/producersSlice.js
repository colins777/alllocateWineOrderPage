import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {countTotalProductsSumm} from "../../../helpers/countTotalProductsSumm";

const initialState = {
    producers: [],
    currency: null,
    subtotal: 0,
    shipping_cost: 0,
    storage_fee: 0,
    total_cost : 0,
    allocation_number: 0,
    confirmation_deadline: null,
    order_status: null,
    addresses: [],

    //not using on backend
    loading: true,
    saveBtnDisabled: true,
    error: false,
    checkedProductsQty: 0,
    selectedAllProducts: 0,
    allProductsRestQty: []
};

export const getProducers = createAsyncThunk(
    'producers/getProducers',
    async (_, {rejectWithValue, dispatch} ) => {
        try {
            const {data} = await axios.get('http://localhost:3004/allocateData');
            console.log('producers slice', data)
            return data;
        } catch (e) {
            //console.log('getProducers Error: ', e)
            console.log('Error', e)
            return e;
        }
    }
);

export const saveAllData = createAsyncThunk(
    'producers/saveAllData',
    async (data, {rejectWithValue}) => {
        try {
           await axios.post('http://localhost:3004/allocateAllData',
                data
            );
            return data;
        } catch (e) {
            console.log('Saving error: ', e.message)
            return rejectWithValue(e.message)
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
            console.log('action', action);

            if (action.payload.product_checked) {
                state.producers[action.payload.producerIndex].products[action.payload.productIndex].checked = 0;
                state.checkedProductsQty = state.checkedProductsQty - 1;
            } else {
                state.producers[action.payload.producerIndex].products[action.payload.productIndex].checked = 1;
                state.checkedProductsQty = state.checkedProductsQty + 1;
            }

        },

        //Producer Accept/Decline
        setAcceptDeclineProducts: (state, action) => {
            //decline
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
                    });

                    if (producersQty === producersDeclined.length) {
                        state.total_cost = 0;
                    } else {
                        state.total_cost = state.total_cost - productsDeclinedSum;
                    }

                } else {
                    //Accepted
                    //@TODO not correct calculation of total sum if radio buttons not setted
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

            let producerProdSumArr = [];
            state.producers.map((producer) => {
                producer.products.map((product) => {
                    if (!product.declined) {
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
            state.producers.map((producer, index) => {
                state.producers[index].declined = true;
                producer.products.map((product, productIndex) => {
                    state.producers[index].products[productIndex].declined = true;
                    //set total product sum to 0
                    state.producers[index].products[productIndex].total_sum = 0;
                })
            })

            state.subtotal = 0;
            state.total_cost = 0;
        },

        setAcceptAllProducts:  (state, action) => {
            state.producers.map((producer, index) => {
                state.producers[index].declined = false;
                producer.products.map((product, productIndex) => {
                    const currentProduct = state.producers[index].products[productIndex];
                    currentProduct.declined = false;
                    currentProduct.total_sum = currentProduct.price * currentProduct.offered;
                })
            });
            let totalProductsSum = countTotalProductsSumm(state.producers);
            state.subtotal = totalProductsSum;
            state.total_cost = totalProductsSum + state.shipping_cost + state.storage_fee;

           // console.log('totalTest', totalTest)
        },

        setAgreementCheckbox: (state, action) => {
            //console.log('setAgreementCheckbox', action)
            state.agreement =  action.payload;
            if (action.payload) {
                state.saveBtnDisabled = false;
            } else {
                state.saveBtnDisabled = true;
            }
        },
        setCheckedAllProducerProducts: (state, action) => {

            console.log(' setCheckedAllProducerProducts', action);
            const producerIndex = state.producers[action.payload.producerIndex];

            if (action.payload.producer_checked) {
                producerIndex.checked = 0;
                let productQty = 0;
                producerIndex.products.map((product, index) => {
                    productQty++;
                    producerIndex.products[index].checked = false;
                });
                state.checkedProductsQty -= productQty;
            } else {
                let productQty = 0;
                producerIndex.checked = 1;
                producerIndex.products.map((product, index) => {
                    productQty++;
                    producerIndex.products[index].checked = true;
                });
                state.checkedProductsQty += productQty;
            }
        },

        setSelectAllProducts: (state, action) => {
            console.log('setSelectAllProducts', action)
            if (action.payload) {
                state.selectedAllProducts = 0;
               // let productQty = 0;

                state.producers.map((producer, index) => {
                    state.producers[index].checked = 0;
                    producer.products.map((product, i) => {
                        state.checkedProductsQty = 0;
                        state.producers[index].products[i].checked = false;
                    })
                })
            } else {
                state.selectedAllProducts = 1;
                let productQty = 0;

                state.producers.map((producer, index) => {
                    state.producers[index].checked = 1;
                    producer.products.map((product, i) => {
                        productQty++;
                        state.producers[index].products[i].checked = true;
                    })
                })
                state.checkedProductsQty = productQty;

            }
        },
        setSaveDataAddressModal: (state, action) => {
            console.log('setSaveDataAddressModal Action', action)

            const selectedForShippingProducts = action.payload;

            //const allProducersInState = state.producers;

            selectedForShippingProducts.map((product) => {
                console.log('product map', product);

                state.producers[product.producerIndex].products[product.productIndex].addresses.push(product)
                state.modalShow = false;
            })

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

                    state.allocation_number = action.payload.offer_summary.allocation_number;
                    state.confirmation_deadline = action.payload.offer_summary.confirmation_deadline;
                    state.order_status = action.payload.offer_summary.order_status;
                    //console.log('action.payload data', action.payload);
                    state.loading = false;

                    state.addresses = action.payload.addresses;

            //All products for calculate total qty of products of one type in addresses
            const allProductsRemain = [];
            action.payload.producers.map((producer) => {
                producer.products.map((product) => {
                    let newProduct = {...product};
                    newProduct.remainQty = product.offered;

                    allProductsRemain.push(newProduct)
                })
            });
            state.allProductsRestQty = allProductsRemain;


            console.log('payload Back', action.payload)
        },
        [getProducers.rejected]: (state) => {
            state.loading = false
        },
        //Save all data
        [saveAllData.pending]: (state) => {
            state.saveBtnDisabled = true;
            state.error = false;
            state.loading = true;
        },
        [saveAllData.fulfilled]: (state) => {
            state.saveBtnDisabled = false;
            state.loading = false;
        },
        [saveAllData.rejected]: (state) => {
            state.saveBtnDisabled = false;
            state.loading = false;
            state.error = 'Something went wrong...';
        },
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
export const {addProdPriceInTotalCost, minusProdPriceInTotalCost, setOfferedQty, setProductChecked, setAcceptDeclineProducts,
    setDeclineAllProducts, setAcceptAllProducts, setAgreementCheckbox, setCheckedAllProducerProducts, setSelectAllProducts,
    setSaveDataAddressModal
} = producersSlice.actions;

export default producersSlice.reducer