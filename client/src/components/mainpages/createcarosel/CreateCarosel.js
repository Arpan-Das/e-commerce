import React, { useState, useContext, useEffect } from 'react'
import axios from 'axios'
import { GlobalState } from '../../../GlobalState'
import Loading from '../utils/loading/Loading'
import { green } from '@material-ui/core/colors'
import { useHistory, useParams } from 'react-router-dom'



export default function CreateCarosel() {
    const state = useContext(GlobalState)

    const [isAdmin] = state.userAPI.isAdmin
    const [carosel] = state.caroselAPI.carosel
    const [token] = state.token
    const history = useHistory();
    const [images, setImages] = useState(false)
    const [loading, setLoading] = useState(false)
    const [callback, setCallback] = state.productsAPI.callback

    const handleUpload = async e => {
        e.preventDefault()
        try {
            if (!isAdmin) return alert("You are not an admin")
            const file = e.target.files[0]

            if (!file) return alert("File not exist.")

            if (file.size > 3000 * 3000) // 1mb
                return alert("Size too large!")

            if (file.type !== 'image/jpeg' && file.type !== 'image/png')
                return alert("File format is incorrect")

            let formData = new FormData()
            formData.append('file', file)

            setLoading(true)
            const res = await axios.post('api/uploadCarosel', formData, {
                headers: { 'content-type': 'multipart/form-data', Authorization: token }
            })

            setLoading(false)
            setImages(res.data)

        } catch (err) {
            alert(err.response.data.msg)
        }
    }
    const handleDestroy = async () => {
        try {
            if (!isAdmin) return alert("You are not an admin")
            setLoading(true)
            await axios.post('/api//destroyCarosel', { public_id: images.public_id }, {
                headers: { Authorization: token }
            })

            setLoading(false)
            setImages(false)
        } catch (err) {
            alert(err.response.data.msg)
        }
    }
    const styleUpload = {
        display: images ? "block" : "none"
    }
    const btnStyle = {
        color: "green",
        backgroundcolor: "#4CAF50", /* Green */
        padding: "10px"


    }
    const handleSubmit = async e => {
        e.preventDefault()
        try {
            if (!isAdmin) return alert("You are not an Admin.")
            if (!images) return alert("No image Uploaded.")
            await axios.post('/api/carosel', { images }, {
                headers: { Authorization: token }
            })



            setCallback(!callback)
            history.push("/")

        } catch (err) {
            alert(err.response.data.msg)
        }
    }
    const deleteCarosel = async (carosel) => {
        try {
            const public_id = carosel.images.public_id;
            const id = carosel._id;

            // delete the image from cloudinary
            const resCloudinary = await axios.post('/api/destroyCarosel', { public_id: public_id }, {
                headers: { Authorization: token }
            })

            //delete the data from the mongodb
            const resMongo = await axios.delete(`/api/carosel/${id}`)

            alert("You have successfully deleted the image.");
        } catch (err) {
            alert(err.msg)
        }

    }

    return (
        <>
            <h1>Let's create carosel</h1>
            <div class="flex-container">
                <div className="ok">
                    <div className="upload-carosel">
                        <input type="file" name="file" id="file_up" onChange={handleUpload} />
                        {
                            loading ? <div className="file_img" ><Loading /></div>
                                : <div className="file_img" style={styleUpload}>
                                    <img src={images ? images.url : ""} alt="" />
                                    <span onClick={handleDestroy}>X</span>
                                </div>

                        }
                    </div>
                    <h5 id="dimensionInfo">*** Make sure the dimension of the image is 1200*300 px *** </h5>
                    <form onSubmit={handleSubmit}>
                        <button type="submit">upload</button>
                    </form>
                </div>
                <div >
                    <div className="show">
                        {
                            carosel.map(carosel => (
                                <div key={carosel.id} className="imageContainer">

                                    <img className="image" src={carosel.images.url} width="200" />
                                    <button className="but" onClick={() => deleteCarosel(carosel)}>Delete</button>
                                   
                                </div>
                            ))
                        }
                    </div>
                </div>

            </div>
        </>
    )
}
