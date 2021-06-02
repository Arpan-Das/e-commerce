import React, {useContext, useState} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { GlobalState } from '../../../../GlobalState'
export default function BtnRender({poster}) {
    const state = useContext(GlobalState);

    const [loading, setLoading] = useState(false)
    const [token] = state.token   





    const deletePoster =  async (id, public_id) =>{
        try {
            setLoading(true)
            const destroyImg = axios.post('/api/destroyPoster', {public_id: public_id},{
                headers: {Authorization: token}
            })
            const deleteProduct = axios.delete(`/api/Poster/${id}`,{
                headers: {Authorization: token}
            })
            
            await destroyImg
            await deleteProduct
            // setCallback(!callback)
            setLoading(false)

        } catch (err) {
            alert(err.response.data.msg)
        }
    }
    return (
        <div className="row_btn">
            { 
            <> 
                <Link id="btn_buy" to="#!" 
                        onClick={() =>deletePoster(poster._id, poster.images.public_id)}>
                            Delete
                </Link>
                <Link id="btn_view" to={`/edit_poster/${poster._id}`}>
                            Edit
                </Link>
             </>
            }
        </div>
    )
}
