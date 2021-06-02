import React, { useState, useContext, useEffect } from 'react'
import axios from 'axios'
import { GlobalState } from '../../../GlobalState'
import Loading from '../utils/loading/Loading'
import { green } from '@material-ui/core/colors'
import { useHistory, useParams } from 'react-router-dom'
const intialStage = {
   text:'',
   target:''
}

export default function CreatePoster() {
    const state = useContext(GlobalState)
    
    const [poster, setPoster] = useState(intialStage)
    
  

   
    const [token] = state.token
    const history = useHistory();
    const [images, setImages] = useState(false)
    const [loading, setLoading] = useState(false)
    const [isAdmin] = state.userAPI.isAdmin
    const [posters] = state.posterAPI.poster
    const [onEdit, setOnEdit] = useState(false)
    const [callback, setCallback] = state.posterAPI.callback
    

    const param = useParams();

    useEffect(() =>{
        if(param.id){
            setOnEdit(true)
            posters.forEach(poster =>{
                if(poster._id === param.id){ 
                    setPoster(poster)
                    setImages(poster.images)
                }
            })
            
        }
        else{
            setOnEdit(false)
            setPoster(intialStage)
            setImages(false)
        }
       
    },[param.id, posters])

    const handleUpload = async e => {
        e.preventDefault()
        try {
            if(!isAdmin) return alert("You are not an admin")
            const file = e.target.files[0]
            
            if(!file) return alert("File not exist.")

            if(file.size > 3000 * 3000) // 1mb
                return alert("Size too large!")
                
            if(file.type !== 'image/jpeg' && file.type !== 'image/png')
                return alert("File format is incorrect")

            let formData = new FormData()
            formData.append('file', file)

            setLoading(true)
            const res = await axios.post('/api/uploadPoster', formData, {
                headers: {'content-type': 'multipart/form-data', Authorization: token}
            })

            setLoading(false)
            setImages(res.data)
            console.log(images)
            alert('uploaded')

        } catch (err) {
            alert(err.response.data.msg)
        }
    }
    const handleDestroy = async () => {
        try {
            if (!isAdmin) return alert("You are not an admin")
            setLoading(true)
            await axios.post('/api/destroyPoster', { public_id: images.public_id }, {
                headers: { Authorization: token }
            })

            setLoading(false)
            setImages(false)
        } catch (err) {
            alert(err.response.data.msg)
        }
    }
    const handleChangeInput = e =>{
        const {name, value} = e.target
        setPoster({...poster, [name]:value})
    }
    const styleUpload = {
        display: images ? "block" : "none"
    }
    
    const handleSubmit = async e => {
        e.preventDefault()
        try {
            if (!isAdmin) return alert("You are not an Admin.")
            if (!images) return alert("No image Uploaded.")
            if(onEdit){  
                await axios.put(`/api/Poster/${poster._id}`, {...poster, images}, {
                    headers: {Authorization: token}
                })
            }
            else{
                await axios.post('/api/Poster', {...poster, images}, {
                    headers: {Authorization: token}
                })
            }


        alert("poster created")
        setCallback(!callback)
         history.push("/")

        } catch (err) {
            alert(err.response.data.msg)
        }
    }
   
    console.log(images)
    console.log(poster)
    return (
        <div>
            <h1>Let's create Poster</h1>
            <div className="create_product">
            <div className="upload">
                <input type="file" name="file" id="file_up" onChange={handleUpload}/>
                {
                    
                    loading ? <div className="file_img" ><Loading /></div>
                    : <div className="file_img" style={styleUpload}>
                        <img src={images ? images.url : ""} alt=""/>
                        <span onClick={handleDestroy}>X</span>
                    </div>
                
                }
            </div>
            <div>
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <label htmlFor="text">Text:</label>
                    <input type="text" name="text" id="text" required
                    value={poster.text} onChange={handleChangeInput}  />
                </div>
                <div className="row">
                    <label htmlFor="target">Target:</label>
                    <input type="text" name="target" id="target" required
                    onChange={handleChangeInput}  value={poster.target}/>
                </div>
                

                <button type="submit">{onEdit ? "Update" : "Create"}</button>
            </form>
            </div>
                
                    
        </div>
        </div>
        
    )
}
