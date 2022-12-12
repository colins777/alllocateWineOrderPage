//for split all reducers in one parent reducer
import {combineReducers} from 'redux';
import producersSlice from "./features/producers/producersSlice";
//import {productItemSlice} from "./features/product/productItemSlice";
import {addressModalSlice} from "./features/addressModal/addressModalSlice";
import {dropdownAddressesSelectSlice} from "./features/dropdownAddressesSelect/dropdownAddressesSelectSlice";
import {changeQuantitySlice} from "./features/changeQuantity/changeQuantitySlice";

const rootReducer = combineReducers({
    producersSlice,
    addressModalSlice,
    dropdownAddressesSelectSlice,
    changeQuantitySlice
});

export default rootReducer;