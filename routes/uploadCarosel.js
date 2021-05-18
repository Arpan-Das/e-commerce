const router = require('express').Router()
const cloudinary = require('cloudinary')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')
const fs = require('fs')

//we will upload image on cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
})

// upload image only admin can use
router.post('/uploadCarosel',auth,authAdmin,(req, res) =>{
    try {
       // console.log(req.files)
        if(!req.files || Object.keys(req.files).length ===0 )
            return res.status(400).json({msg:'No files were Uploaded'})
    
        const file = req.files.file;
        if(file.size > 3000*3000) {
            removeTmp(file.tempFilePath)
            return res.status(400).json({msg: "Size too large"})
        }

        if(file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png'){
            removeTmp(file.tempFilePath)
            return res.status(400).json({msg: "File format is incorrect."})
        }
        
        cloudinary.v2.uploader.upload(file.tempFilePath, {folder: "carosel"}, async(err, result)=>{
            if(err) throw err;

            removeTmp(file.tempFilePath)


            res.json({public_id: result.public_id, url: result.secure_url})
        })
    } catch (err) {
       return res.status(500).json({msg: err.message})
    }
})

router.post('/destroyCarosel',auth,authAdmin, (req, res)=>{
    try {
        const {public_id} = req.body;
        if(!public_id) return res.status(400).json({msg: 'No image Selected'})

        cloudinary.v2.uploader.destroy(public_id, async(err, result)=>{
            if(err) throw err;

            res.json({msg: "Deleted Image"})
        })

    } catch (err) {
        return res.status(400).json({err: err.message})
    }
})

const removeTmp = (path) =>{
    fs.unlink(path, err=>{
        if(err) throw err;
    })
}

module.exports = router