//for split all reducers in one parent reducer
import {combineReducers} from 'redux';
import producersSlice from "./features/producers/producersSlice";
import {productItemSlice} from "./features/product/productItemSlice";

const rootReducer = combineReducers({
    producersSlice,
    //productItemSlice
});

export default rootReducer;