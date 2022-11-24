import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {useCallback} from "react";

const initialState = {
    producers: [],
    currency: 0,
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
            dispatch(setProducers(data.producers))
            dispatch(setCurrency(data.currency))
            dispatch(setTotalCost(data.offer_summary.total_cost))



            console.log('producers slice', data.producers)
        } catch (e) {
            console.log('Error: ', e)
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
            //state.currency = action.currency
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
            console.log('state', state)
            console.log('action', action)

            state.total_cost = state.total_cost + action.payload.price

            state.counter = state.counter + action.payload.price

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
            state.loading = false
           /// state.push(action.payload)
        },
        [getProducers.rejected]: (state) => {
            state.loading = false
        }
    },
});
//redux saving methods in action object
export const {setProducers, setCurrency, setSubtotal, setShippingCost, setStorageFee, setTotalCost, addProdPriceInTotalCost, addCounter, setCounter} = producersSlice.actions

export default producersSlice.reducer