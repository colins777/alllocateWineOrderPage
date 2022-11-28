import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
//import {store} from "../../store";
import {useCallback} from "react";

const initialState = {
    producers: [],
    currency: null,
    subtotal: 0,
    shipping_cost: 0,
    storage_fee: 0,
    total_cost : 0,
    loading: true,
    counter: 10
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
)



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
            state.total_cost = state.total_cost + action.payload.price
            //state.producers[0].products[0].total_sum = 1
            state.producers[action.payload.producerIndex].products[action.payload.productIndex].total_sum
                += state.producers[action.payload.producerIndex].products[action.payload.productIndex].price
        },
        minusProdPriceInTotalCost: (state, action) => {
            //console.log('state', state)
           // console.log('action', action)
            state.total_cost = state.total_cost - action.payload.price
            state.producers[action.payload.producerIndex].products[action.payload.productIndex].total_sum
                -= state.producers[action.payload.producerIndex].products[action.payload.productIndex].price

            //test
            //state.counter = state.counter + action.payload.price

        },
        //test
        setCounter: (state, action) => {
            state.counter = state.counter
        },

        addCounter: (state, action) => {
            state.counter = state.counter + action.payload

            console.log('state', state.counter)
            console.log('action.payload', action.payload)
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
                    state.total_cost = action.payload.offer_summary.total_cost;
                    console.log('action.payload data', action.payload);
                    state.loading = false
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
export const {setProducers, setCurrency, setSubtotal, setShippingCost, setStorageFee, setTotalCost, addProdPriceInTotalCost, minusProdPriceInTotalCost, addCounter, setCounter} = producersSlice.actions

export default producersSlice.reducer