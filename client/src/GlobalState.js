import React, { createContext, useState, useEffect} from 'react';
import ProductsAPI from './API/ProductsAPI';
import UserAPI from './API/UserAPI';
import CategoriesAPI from './API/CategoriesAPI';
import CaroselAPI from './API/CaroselAPI'
import axios from 'axios';


export const GlobalState = createContext();

export const DataProvider = ({children}) =>{
    const [token, setToken] = useState(false);
    
    

    useEffect(() =>{
        const firstlogin = localStorage.getItem('firstlogin')
        if(firstlogin){
            const refreshToken = async () =>{
                const res = await axios.get('/user/refresh_token')    
                setToken(res.data.accesstoken)
                
                setTimeout(() => {
                    refreshToken()
                }, 10 * 60 * 1000)
            }
            refreshToken()
        }
    },[])


    const state = {
        token: [token, setToken],
        productsAPI: ProductsAPI(),
        userAPI: UserAPI(token),
        categoriesAPI: CategoriesAPI(),
        caroselAPI:CaroselAPI()
    }

    return(
        <GlobalState.Provider value={state}>
            {children}
        </GlobalState.Provider>
    )
}