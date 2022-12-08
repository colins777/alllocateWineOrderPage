import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    chosenAddressId: null
};

export const dropdownAddressesSelectSlice = createSlice({
    name: 'dropdownAddressesSelect',
    initialState,
    reducers: {
        setAddressToProducts: (state, action) => {
            console.log('setAddressToProducts id', action.payload)
            state.chosenAddressId = +action.payload;
        }
    }
});

export const {setAddressToProducts} = dropdownAddressesSelectSlice.actions;

export default dropdownAddressesSelectSlice.reducer;