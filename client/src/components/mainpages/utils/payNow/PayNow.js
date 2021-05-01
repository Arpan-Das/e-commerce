import React, { useContext, useState } from 'react'
import axios from 'axios'
import { GlobalState } from '../../../../GlobalState';

function PayNow({deliveryAddress, setDeliveryAddress, cart, setCart, grandTotal, setGrandTotal, handleNext}) {
    const state = useContext(GlobalState);
    const [token] = state.token;
    const [paymentMode, setPaymentMode] = useState({
        mode:'select'
    });  
    const paymentID = "sdkjfhdsfoiewfkdbsakfjfohwoeo9hsadhf83hhf";// dummy paymnetId

    const addToCart = async (cart) => {
        await axios.patch('/user/addcart', {cart}, {
            headers: {Authorization: token}
        })        
    }
    const tranSuccess = async () =>{
        if(paymentMode.mode === 'select') return alert("Please select a payment mode !!!")
        if(deliveryAddress.length === 0) return alert("Please select an Address before Proceding!!!")

        await axios.post('/api/payment', {cart, paymentID, address: deliveryAddress}, {
            headers: {Authorization: token}
        })

        setCart([]);        
        addToCart([]);
        setDeliveryAddress([]);
        setGrandTotal(0);
        handleNext()
        alert("You have successfully placed an order.")        
    }
    const handleCheck = (e) =>{        
       setPaymentMode({...paymentMode, mode: e.target.value});
    }

    return (
        <div className="payNow">
            <p>Pay: Rs. {grandTotal} </p>
            <div className="payNow__option">
                <p>Select a payment method</p>
                <div className="cod">
                    <input type="radio" name="payment" id="cod" value="cod" onClick={handleCheck}/>
                    <label htmlFor="cod">Cash On Delivery</label>
                </div>
                <div className="online" >
                    <input disabled="true"  type="radio" name="payment" id="online" value="online" onClick={handleCheck}/>
                    <label style={{color: false?'':'rgba(0, 0, 0, 0.54)'}} htmlFor="online">Online Paymnet (Currently Not Available)</label>
                </div>
            </div>
            <div className="payNowBtn">
                <button className="button" onClick={() => tranSuccess()}> Checkout </button>
            </div>
        </div>
    )
}

export default PayNow
