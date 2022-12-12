import React, {useState} from "react";
import './AddressModal.scss';
import {useSelector, useDispatch} from "react-redux";
import {setHideAddressModal} from "../../redux/features/addressModal/addressModalSlice";
import {ProductModal} from "../ProductModal/ProductModal";
import DropdownAddressesSelect from "../DropdownAddressesSelect/DropdownAddressesSelect";
import {getProducerIndexInArray} from "../../helpers/getProducerIndexInArray";
import {getProductIndexInArray} from "../../helpers/getProductIndexInArray";
import {setSaveDataAddressModal} from "../../redux/features/producers/producersSlice";

const AddressModal = () => {
    const dispatch = useDispatch();
    const showAddressModal = useSelector((state) => {return state.addressModalData.modalShow});
    const hideAddressModalHandler = () => {
        dispatch(setHideAddressModal())
    };

    const checkedProducts = useSelector((state) => {return state.addressModalData.checked_products});
    const [showChangeQty, setChangeQty] = useState(false);
    const dropdownAddressesList = useSelector(state => state.producersData.addresses);
    const allProducersArr = useSelector(state => state.producersData.producers);
    const selectedAddressId = +useSelector(state => state.selectAddressesData.chosenAddressId);



    const actionData = [];

    checkedProducts.map((product, p_index) => {
        let producerIndex = getProducerIndexInArray(allProducersArr, product.producer_id);
        let productIndex = getProductIndexInArray(allProducersArr, producerIndex, product.id);
        //for prevent error - /object is not extensible/
        let newProduct = {...product};

        newProduct.productIndex = productIndex;
        newProduct.producerIndex = producerIndex;
        newProduct.selected_address_id = selectedAddressId;
        newProduct.product_total_selected = product.offered;
        actionData.push(newProduct)
    });

    //console.log(' actionData',  actionData)

    const saveDataAddressModal = () => {
       dispatch(setSaveDataAddressModal(actionData))
    };

    const closeAddressModalHandler = () => {
        dispatch(setHideAddressModal())
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

                        <DropdownAddressesSelect
                            addresses={dropdownAddressesList}
                        />

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
                    <a className="save modal-btn"
                       onClick={(e) => {e.preventDefault();
                                        saveDataAddressModal();
                                        closeAddressModalHandler();
                       }
                       }
                    >
                        Save
                    </a>
                </div>
            </div> {/*modal__content*/}

        </div>
    )
};

export default AddressModal;