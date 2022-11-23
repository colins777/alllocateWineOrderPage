import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {useCallback} from "react";

const initialState = {
    producers: [],
    currency: 0,
    loading: true,
    //test
    counter: 0
};

export const getProducers = createAsyncThunk(
    'producers/getProducers',
    async (_, {rejectWithValue, dispatch} ) => {
        try {
            const {data} = await axios.get('http://localhost:3004/allocateData')
            dispatch(setProducers(data.producers))
            //return data;

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
        //test
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
export const {setProducers, setCurrency, addCounter} = producersSlice.actions

export default producersSlice.reducer