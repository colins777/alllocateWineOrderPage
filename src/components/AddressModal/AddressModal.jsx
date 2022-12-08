import React, {useState} from "react";
import './AddressModal.scss';
import {useSelector, useDispatch} from "react-redux";
import {setHideAddressModal} from "../../redux/features/addressModal/addressModalSlice";
import {ProductModal} from "../ProductModal/ProductModal";

const AddressModal = () => {
    const dispatch = useDispatch();
    const showAddressModal = useSelector((state) => {return state.addressModalData.modalShow});

    const hideAddressModalHandler = () => {
        dispatch(setHideAddressModal())
    };

    const checkedProducts = useSelector((state) => {return state.addressModalData.checked_products});

    const [showChangeQty, setChangeQty] = useState(false);

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
                    <div className="contact-information">
                        <h4 className="title">Enter your contact information</h4>
                        <div className="inputs-wrap">
                            <label htmlFor="">
                                <span>Email</span>
                                <input type="email" placeholder="Email"/>
                            </label>

                            <label htmlFor="">
                                <span>Telephone</span>
                                <input type="phone" placeholder="phone"/>
                            </label>


                        </div>
                    </div>


                    <div className="selected-products">
                        <div className="title">
                            <span className="selected-items-title">Selected items</span>
                            <span className="change-qty"
                                onClick={(e) => setChangeQty(!showChangeQty)}
                            >
                                Change quantity
                            </span>
                        </div>

                        {checkedProducts.map((product) =>
                            (<ProductModal product={product} key={product.id} showChangeQty={showChangeQty}/>))
                        }
                    </div>
                    {/*selected-products*/}
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