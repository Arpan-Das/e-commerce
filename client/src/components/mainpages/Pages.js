import React, {useContext} from 'react';
import {Switch, Route} from 'react-router-dom';
import Products from './products/Products';
import Login from './auth/Login';
import Register from './auth/Register';
import Cart from './cart/Cart';
import NotFound from './utils/not_found/NotFound';
import DetailProduct from './detailProduct/DetailProduct';
import {GlobalState} from '../../GlobalState';
import Checkout from './checkout/Checkout';
import OrderHistory from './history/OrderHistory';
import DetailHistory from './history/DetailHistory';
import Categories from './categories/Categories';
import CreateProduct from './createProduct/CreateProduct';
import HomePage from './homepage/HomePage';
import CreateCarosel from "./createcarosel/CreateCarosel"
import Createposter from "./createPoster/CreatePoster"

function Pages() {
    const state = useContext(GlobalState);
    const [isLogged] = state.userAPI.isLogged
    const [isAdmin] = state.userAPI.isAdmin

    return (
        <Switch>
            <Route exact path='/' >
              <HomePage/>
            </Route>
            <Route exact path='/store' >
                <Products />
            </Route>            
            <Route exact path='/login' >
               {isLogged ? <NotFound/> : <Login />} 
            </Route>
            <Route exact path='/register' >
               {isLogged ? <NotFound/> : <Register />} 
            </Route>
            <Route exact path='/detail/:id' >
                <DetailProduct />
            </Route>
            <Route exact path='/history' >
               {isLogged ? <OrderHistory /> : <NotFound />} 
            </Route>
            <Route exact path='/history/:id' >
               {isLogged ? <DetailHistory /> : <NotFound />} 
            </Route>
            <Route exact path='/cart' >
                <Cart />
            </Route>
            <Route exact path='/checkout' >
               {isLogged ? <Checkout /> : <NotFound/>} 
            </Route>
            <Route exact path='/category' >
               {isAdmin ? <Categories /> : <NotFound/>} 
            </Route>
            <Route exact path='/create_product' >
               {isAdmin ? <CreateProduct /> : <NotFound/>} 
            </Route>
            <Route exact path='/create_carosel' >
               {isAdmin ? <CreateCarosel /> : <NotFound/>} 
            </Route>
            <Route exact path='/create_poster' >
               {isAdmin ? <Createposter/> : <NotFound/>} 
            </Route>
            <Route exact path='/edit_product/:id' >
               {isAdmin ? <CreateProduct /> : <NotFound/>} 
            </Route>
            <Route exact path='/edit_poster/:id' >
               {isAdmin ? <Createposter/> : <NotFound/>} 
            </Route>
            
            <Route path='*' >
                <NotFound />
            </Route>
        </Switch>
    )
}

export default Pages
