import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {getProducers, producersSlice} from "../producers/producersSlice";

const initialState = {

};

export const productItemSlice = createSlice({
    //slice name
    name: 'producers',
    //initial state
    initialState,
    //object reducer with actions
    reducers: {
        setProducers: (state, action) => {
            state.producers = action.payload
            //state.currency = action.currency
        },
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

export default productItemSlice.reducer