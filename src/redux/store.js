import {configureStore} from "@reduxjs/toolkit";
import producersSlice from "./features/products/producersSlice";


export const store = configureStore({
    //store get data from slices using reducers
    reducer: {
        producers: producersSlice
    },
});