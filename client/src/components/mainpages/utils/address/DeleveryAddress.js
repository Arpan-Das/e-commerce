import React,{useState, useContext} from 'react'
import { GlobalState } from '../../../../GlobalState';
import axios from 'axios';
import AddressList from './AddressList';


const intialAddress = {
    Name: "",
    Address_Line_1: "",
    Address_Line_2: "",
    Address_Line_3: "",
    District: "",
    State: "",
    Country: "India",
    PIN: "",
    Mobile_No: "" 
} 

function DeliveryAddress({setDeliveryAddress, setActiveStep}) {
    const state = useContext(GlobalState);
    const [token] = state.token;
    const addAddress = state.userAPI.addAddress
    const [addresss, setAddresss] = state.userAPI.addresss    
    const [address, setAddress] = useState({
        Name: "",
        Address_Line_1: "",
        Address_Line_2: "",
        Address_Line_3: "",
        District: "",
        State: "",
        Country: "India",
        PIN: "",
        Mobile_No: "" 
    })
    const [editAddress, setEditAddress] = useState(false)
    const [editIndex, setEditIndex] = useState(-1)
    const [newAddress, setNewAddress] = useState(false) 

    const handleChangeInput = e =>{
        const {name, value} = e.target
        setAddress({...address, [name]:value})
    }    
    const handleSelect = (address) =>{  
        // this will help to select the delevery address 
        setDeliveryAddress(address)
        setActiveStep((prevActiveStep) => prevActiveStep + 1);        
    }
    const handleEdit = (address, index) =>{
        // this will help to edit the address in the database
        setAddress(address)
        setEditAddress(true) // true
        setEditIndex(index) 
        setNewAddress(true) // true
    }
    const handleDestroy = async (id) =>{
        // this function will delete the address from the data base
        
        if(window.confirm("Do you want to delete this Address?")){
            addresss.splice(id, 1)
            setAddresss([...addresss])
           
            await axios.patch('user/addAddress', {address: addresss}, {
                headers: {Authorization: token}
            })
        }
    }
    const handleSubmit = async e =>{
        // this function will help in add a new address to the database 
        // and also update a old passsword when user click on the edit button
        e.preventDefault()
        console.log("edit address", editAddress)
        if(editAddress){
            addresss[editIndex] = address
            setAddresss(addresss)

            await axios.patch('user/addAddress', {address: addresss}, {
                headers: {Authorization: token}
            }) 
            alert("Your address has been Updated.")
        }else {
            addAddress(address)
            alert("You have successfully add a new Address.")
        }
       
        setAddress(intialAddress)
        setNewAddress(!newAddress)
    }
   
    const styleNewButton = {
        display: newAddress ? "none" : "block"
    }
    const styleNewAddress ={
        display: newAddress ? "block" : "none" 
    }
    
    return (
        <div className="deleveryAddress"> 
            <div className="address">
                {   // this will show the previous address of the user if any
                    addresss.length !== 0 ?
                    addresss.map((address, index)=>(
                        <AddressList address={address} key={index} id={index} handleChangeInput={handleChangeInput} handleDestroy={handleDestroy}
                        handleSelect={handleSelect} editAddress={editAddress} handleEdit={handleEdit} newAddress={newAddress}/>
                    ))
                    : ""
                }
                {/*  this code for the add new address */}
                <button className="button" style={styleNewButton} onClick={() =>setNewAddress(!newAddress)}>+ Add New Address</button>
                <div style={styleNewAddress} className="newAddress">
                    <form onSubmit={handleSubmit}>
                        <input type="text" name="Name"  required
                        placeholder="Name*" value={address.Name} onChange={handleChangeInput}/>
                        
                        <input type="text" name="Address_Line_1"   required 
                        placeholder="Address Line 1*" value={address.Address_Line_1} onChange={handleChangeInput} />
                        
                        <input type="text" name="Address_Line_2" 
                        placeholder="Address Line 2" value={address.Address_Line_2} onChange={handleChangeInput} />
                        
                        <input type="text" name="Address_Line_3"  
                        placeholder="Address Line 3" value={address.Address_Line_3} onChange={handleChangeInput} />
                        
                        <input type="text" name="District" required 
                        placeholder="District*" value={address.District} onChange={handleChangeInput} />

                        <input type="text" name="State" required 
                        placeholder="State*" value={address.State} onChange={handleChangeInput} />
                        
                        <input type="text" name="Country" required 
                        placeholder="Country*" value={address.Country} onChange={handleChangeInput} />
                        
                        <input type="number" name="PIN" required 
                        placeholder="PIN*" value={address.PIN} onChange={handleChangeInput} />
                        
                        <input type="number" name="Mobile_No" required 
                        placeholder="Mobile Number*" value={address.Mobile_No} onChange={handleChangeInput} />

                        <div className="row">
                            <button className="button" type="submit">{editAddress ? "Update":"Add"}</button>
                            <button className="button" onClick={()=>{
                                setNewAddress(!newAddress)
                                if(editAddress){
                                    setAddress(intialAddress) //blank
                                    setEditAddress(false) //false
                                    setEditIndex(-1)
                                }
                            }}>Cancel</button>
                        </div>
                    </form>
                </div>
            </div> 

        </div>
    )
}

export default DeliveryAddress
