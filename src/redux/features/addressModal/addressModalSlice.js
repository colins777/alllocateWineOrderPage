import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    modalShow: false
};

export const addressModalSlice = createSlice({
    name: 'addressModal',
    initialState,
    reducers: {
        setShowHideAddressModal: (state, action) => {
            console.log('showHideAddressModal action', action)
            state.modalShow = action.payload


        }
    }
});

export const {setShowHideAddressModal} = addressModalSlice.actions

export default addressModalSlice.reducer