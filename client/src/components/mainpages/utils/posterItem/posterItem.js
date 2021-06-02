import React, {useContext, useState} from 'react';

import BtnRender from './BtnRender'
import "./posterItem.css"
export default function posterItem({poster,isAdmin}) {
    
   
    return (
        <div className="poster_card">
            <div className="poster_box">
                <h4>{poster.text}</h4>
            </div>
            <img src={poster.images.url} alt=""/>
            {
                isAdmin && 
                <BtnRender poster={poster}/>
            }
        </div>
    )
}
