import React from "react";
import './AddressModal.scss';
import {useSelector, useDispatch} from "react-redux";
import {setShowHideAddressModal} from "../../redux/features/addressModal/addressModalSlice";

const AddressModal = () => {
    const dispatch = useDispatch();
    const showAddressModal = useSelector((state) => {return state.addressModalData.modalShow});


    console.log('showAddressModal', showAddressModal)

    const hideAddressModalHandler = () => {
        dispatch(setShowHideAddressModal(false))
    }

    return (
        <div className={showAddressModal ? 'r-address-modal active' : 'r-address-modal hide'}>
            <div className="r-address-modal__content">
                <div className="inner">
                    <h2 className="modal-title">SHIP OR STORE SELECTION</h2>
                    <div className="chose-shipping">
                        <span className="left">
                            Choose a shipping or storage destination
                        </span>
                        <a className="add-address">
                            Add address
                        </a>
                    </div>
                    
                    <div className="destination">
                        <span className="title">Destination</span>
                        <select name="" id="" className="select-address">
                            <option value="1">Store with Burgundy Wine Bond</option>
                            <option value="2">Store 2</option>
                        </select>
                        <div className="address-fields">
                            <span className="field">Burgundy Wine Bond</span>
                            <span className="field">4B rue de Romelet</span>
                            <span className="field">21600 Longvic</span>
                            <span className="field">France</span>
                        </div>
                    </div>
                </div> {/*/inner*/}
                <div className="buttons">
                    <a className="cancel modal-btn"
                        onClick={(e) => {e.preventDefault(); hideAddressModalHandler()}}
                    >
                        Cancel
                    </a>
                    <a className="save modal-btn">Save</a>
                </div>
            </div> {/*modal__content*/}

        </div>
    )
};

export default AddressModal;