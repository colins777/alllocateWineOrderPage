import {createSlice} from "@reduxjs/toolkit";
import {useSelector} from "react-redux";

const initialState = {
    modalShow: false,
    checked_products: [],
    addresses_modal: [
        // {'products' : [],
        //     'id': 323232,
        //     'email': 'test@gail.com',
        //     'phone': '050 34 90 333'
        // }
    ]
};

export const addressModalSlice = createSlice({
    name: 'addressModal',
    initialState,
    reducers: {
        setShowAddressModal: (state, action) => {
            console.log('showHideAddressModal action.payload', action.payload)
            state.modalShow = action.payload.modalShow;
            //state.addresses = 'test'

            let checkedProductsArr = [];

            if (action.payload.producers) {
                action.payload.producers.map((producer) => {
                    console.log('producer', producer)
                        producer.products.map((product) => {
                            if (product.checked) {
                                checkedProductsArr.push(product)
                            }
                        })

                })
            }

            state.checked_products = checkedProductsArr;
            //state.addresses_modal = [...state.addresses_modal, checkedProductsArr]
          // state.addresses_modal = state.addresses_modal.push(checkedProductsArr);

            console.log('checkedProductsArr', checkedProductsArr)
                //1 find all checked products and get IDs arr
                //2 create new Address in addresses state that contain all checked products
                //3 push all data of each finded product in this address
                //4 if address for different products saved in modal set checkbox disabled and disabled store btn
                //5 if products not added in address user can add it in new address or existing address


            //create object with key of productsIDs - like this 101102
            // {
            //     '101102' : [
            //     {prod1},
            //     {prod2},
            // ]
            // }
        },
        setHideAddressModal: (state, action) => {
            state.modalShow = false;
        }
    }
});

export const {setShowAddressModal, setHideAddressModal} = addressModalSlice.actions

export default addressModalSlice.reducer