import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    modalShow: false,
    checked_products: [],
};

export const addressModalSlice = createSlice({
    name: 'addressModal',
    initialState,
    reducers: {
        setShowAddressModal: (state, action) => {
            state.modalShow = action.payload.modalShow;

            let checkedProductsArr = [];
            if (action.payload.producers) {
                action.payload.producers.map((producer) => {
                        producer.products.map((product, prodIndex) => {
                            if (product.checked) {
                                checkedProductsArr.push(product)
                            }
                        })
                })
            }
            state.checked_products = checkedProductsArr;
        },
        setHideAddressModal: (state, action) => {
            state.modalShow = false;
        }
    }
});

export const {setShowAddressModal, setHideAddressModal} = addressModalSlice.actions;

export default addressModalSlice.reducer