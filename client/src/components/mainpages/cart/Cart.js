import React, {useContext} from 'react'
import {GlobalState} from '../../../GlobalState'
import axios from 'axios'
import Subtotal from '../utils/subtotal/Subtotal'

function Cart() {
    const state = useContext(GlobalState)
    const [cart,setCart] = state.userAPI.cart;
    const [token] = state.token
    

    const addToCart = async () => {
        await axios.patch('/user/addcart', {cart}, {
            headers: {Authorization: token}
        })        
    }

    const increment = (id) =>{
        cart.forEach(item => {
            if(item._id === id){
                item.quantity += 1
            }
        })
        setCart([...cart])

        addToCart()
    }
    const decrement = (id) =>{
        cart.forEach(item => {
            if(item._id === id){
                item.quantity === 1 ? item.quantity = 1 : item.quantity -= 1
            }
        })
        setCart([...cart])

        addToCart()
    } 
    const removeProduct = (id) =>{
        if(window.confirm("Do you want to delete this product?")){
            cart.forEach((item, index) => {
                if(item._id === id){
                    cart.splice(index, 1)
                }
            })
            setCart([...cart])

            addToCart()
        }
    }

    if(cart.length === 0){
        return <h1 style={{textAlign: "center", fontSize: "Srem"}}>Cart Empty</h1>
    }
    
    
    return (
        <div>
            {   
                cart.map(item => (
                    <div className="detail cart" key={item._id}>
                        <img src={item.images.url} alt="" />

                        <div className="box-detail">
                            <h2>{item.title}</h2>

                            <h3>Rs. {item.price * item.quantity}</h3>
                            <p>{item.description}</p>
                            <p>{item.content}</p>

                            <div className="amount">
                                <button onClick={() => decrement(item._id)}> - </button>
                                <span>{item.quantity}</span>
                                <button onClick={() => increment(item._id)}> + </button>
                            </div>
                            
                            <div className="delete" 
                            onClick={() => removeProduct(item._id)}>
                                X
                            </div>
                        </div>
                    </div>
                ))
            }

            <div>
                <Subtotal />
            </div>
           
        </div>
    )
}

export default Cart
