import {createSlice} from "@reduxjs/toolkit";

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
        },
    },
    extraReducers: {

    },
});

export default productItemSlice.reducer