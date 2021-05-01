import React,{useContext,useState, useEffect} from 'react';
import './subtotal.css';
import CurrencyFormat from "react-currency-format";
import { GlobalState } from '../../../../GlobalState';
import { Link } from 'react-router-dom';

function Subtotal() {
    const state = useContext(GlobalState);
    const [cart] = state.userAPI.cart;
    const [total, setTotal] = useState(0);
    
    useEffect(() =>{
        const getTotal = () =>{
            const total = cart.reduce((prev, item) => {
                return prev + (item.price * item.quantity)
            },0)

            setTotal(total)
        }

        getTotal()
    },[cart])

    return (
        <div className="subtotal">
            <CurrencyFormat
                renderText={(value) => (
                    <>
                        <p>
                            Subtotal ({cart.length} items): <strong>{value}</strong>
                        </p>
                        <small className="subtotal__gift">
                            <input type="checkbox" /> This order contains a gift
                        </small>
                    </>
                )}
                decimalScale={2}
                value= {total}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"Rs. "}
            />
            
            <Link to="/checkout" >Proceed to Checkout</Link>
            
        </div>
    )
}

export default Subtotal;
