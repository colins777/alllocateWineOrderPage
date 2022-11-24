import {configureStore} from "@reduxjs/toolkit";
import producersSlice from "./features/producers/producersSlice";


export const store = configureStore({
    //store get data from slices using reducers
    reducer: {
        producersData: producersSlice
    },
});