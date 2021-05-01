import {useState, useEffect} from 'react';
import axios from 'axios';

function UserAPI(token) {
    const [isLogged, setIsLogged] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [cart, setCart] = useState([])
    const [history, setHistory] = useState([])
    const [addresss, setAddresss] = useState([])
    const [addToCartStatus, SetAddToCartStatus] = useState(false)

    useEffect(() => {
        if(token){
            const getUser = async () =>{
                try {
                    const res = await axios.get('/user/infor', {
                        headers:{Authorization: token}
                    })

                    setIsLogged(true)
                    res.data.role === 1 ? setIsAdmin(true) : setIsAdmin(false)

                    setCart(res.data.cart)
                    setAddresss(res.data.address)

                } catch (err) {
                    alert(err.response.data.msg)
                }
            }

            getUser()
        }
    },[token])    
    
    const addCart = async (product) => {
        if(!isLogged) return alert("Please login to continue buying")        
        
        const check = cart.every( item =>{
            return item._id !== product._id
        })

        if(check) {
            setCart([...cart, {...product, quantity: 1}])

            await axios.patch('/user/addCart', {cart: [...cart, {...product, quantity: 1}]}, {
                headers: {Authorization: token}
            })
            SetAddToCartStatus(true)
        }else {
            alert("This product has been added to cart.")
        }
       
    }

    const addAddress = async (address) =>{
        if(!address) return alert("Please provide some address")

        setAddresss([...addresss, {...address}])
        await axios.patch('user/addAddress', {address: [...addresss, {...address}]}, {
            headers: {Authorization: token}
        })
    }

    return {
        isLogged: [isLogged, setIsLogged],
        isAdmin: [isAdmin, setIsAdmin],
        cart: [cart, setCart],
        addCart: addCart,
        history: [history, setHistory],
        addresss: [addresss, setAddresss],
        addAddress: addAddress,
        addToCartStatus: [addToCartStatus, SetAddToCartStatus] 
    }
}

export default UserAPI
