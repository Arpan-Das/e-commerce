import {useState,useEffect} from 'react';
import axios from 'axios'

import React from 'react'

export default function PosterApi() {

    const [poster,setPoster]=useState([])
    const [callback, setCallback] = useState(false)


    useEffect(()=>{
        const getPoster=async ()=>{
            const res=await axios.get(`/api/Poster`)
            setPoster(res.data.poster)
        }
        getPoster()
    })
    
    return {
        poster:[poster,setPoster],
        callback: [callback, setCallback]

    }
        
    
}
