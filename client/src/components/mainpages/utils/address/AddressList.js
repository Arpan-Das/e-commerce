import React from 'react'

function AddressList({address, id, handleSelect, handleEdit, newAddress, handleDestroy}) {
    
    const styleAddress_list={
       display: newAddress ? "none": ""
   }
    
    return(
        <div style={styleAddress_list} className="address_list" >            
            <div>
                <p>{address.Name}</p>
                <p>{address.Address_Line_1 +", "+address.Address_Line_2+", "+address.Address_Line_3}</p>
                <p>{address.District}</p>
                <p>{address.State}</p>
                <p>{address.Country}</p>
                <p>{address.PIN}</p>
                <p>{address.Mobile_No}</p>
            </div>
            <div className="row">
                <button className="button" id="select" onClick={()=> {
                    handleSelect(address)
                }}>Select</button>
                <button className="button" id="edit" onClick={()=> handleEdit(address, id)}>Edit</button>
            </div> 
            <span onClick={()=>handleDestroy(id)}>X</span>          
        </div>
    )     
}

export default AddressList
