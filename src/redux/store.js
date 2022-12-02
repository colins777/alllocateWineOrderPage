import {configureStore} from "@reduxjs/toolkit";
import producersSlice from "./features/producers/producersSlice";
import productItemSlice from "./features/product/productItemSlice";
import addressModalSlice from "./features/addressModal/addressModalSlice";


export const store = configureStore({
    //store get data from slices using reducers
    reducer: {
        producersData: producersSlice,
        addressModalData: addressModalSlice
        //productData: productItemSlice
    },
});