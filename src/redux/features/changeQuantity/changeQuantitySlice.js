import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    //allProductsRestQty: []
};

export const changeQuantitySlice = createSlice({
    name: 'changeQuantity',
    initialState,
    reducers: {
        setRestProduct: (state, action) => {
           console.log('setRestProduct action', action)
            state.allProductsRestQty = action;
        }
    }
});

export const {setRestProduct} = changeQuantitySlice.actions;

export default changeQuantitySlice.reducer;