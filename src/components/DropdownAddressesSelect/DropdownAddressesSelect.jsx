import React, {useState} from "react";
import './DropdownAddressesSelect.scss'
import {useDispatch, useSelector} from "react-redux";
import {setAddressToProducts} from "../../redux/features/dropdownAddressesSelect/dropdownAddressesSelectSlice";

const DropdownAddressesSelect = ({addresses}) => {
    const dispatch = useDispatch();

    const onChangeAddressHandler = (addressId) => {
       dispatch(setAddressToProducts(addressId))
    };

    return (
        <select name="shipping_address" className="select-address"
            onChange={(e) => onChangeAddressHandler(e.target.value)}
        >
            {addresses.map((address) => {
               return <option
                   value={address.id}
                   key={address.id}
               >
                   {address.address_name}
               </option>
            })}
        </select>
    )
};

export default DropdownAddressesSelect;