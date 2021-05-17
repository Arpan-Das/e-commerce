import {useState,useEffect} from 'react';
import axios from 'axios'

function CaroselAPI() {
    const [carosel, setCarosel] = useState([])
  
   
    useEffect(() =>{
        const getCarosel = async () => {
            const res = await axios.get(`/api/carosel`)
            setCarosel(res.data.carosel)
            
        }
        getCarosel()
    })

    return {
        carosel: [carosel, setCarosel]
    }
}

export default CaroselAPI
