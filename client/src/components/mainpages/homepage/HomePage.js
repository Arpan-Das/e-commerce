import React, {useContext, useState} from 'react';
import Carosel from "../utils/carosel/carosel"
import { GlobalState } from '../../../GlobalState';
import Loading from '../utils/loading/Loading';
import axios from 'axios';
import PosterItem from '../utils/posterItem/posterItem'
import './HomePage.css'
function HomePage() {
    const state = useContext(GlobalState);
    const [poster, setPoster] = state.posterAPI.poster;
    const [isAdmin] = state.userAPI.isAdmin;

    const fetchposter = () =>{
        if(poster){
            return(
                poster.map(poster =>{
                    return <PosterItem key={poster._id} poster={poster}
                    isAdmin={isAdmin}  />
                })
            )
        }else{
            return <Loading />
        }
    }

    return (
        <div>
             <div>
                 <Carosel/>
               </div>
               <div className="door">
                <h3>Get exiting offers at your door step 😃 </h3>
               </div>
               <div className="posters">
                   {
                       fetchposter()
                   }
               </div>
        </div>
    )
}

export default HomePage
