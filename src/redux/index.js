//for split all reducers in one parent reducer
import {combineReducers} from 'redux';
import producersSlice from "./features/products/producersSlice";

const rootReducer = combineReducers({
    producersSlice
});

export default rootReducer;