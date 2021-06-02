const Poster = require('../models/posterModel')


const posterCtrl={
    getPoster: async(req,res)=>{
        try{
            const poster=await Poster.find()
            res.json({
                status:"success",
                length:poster.length,
                poster:poster
            })
        }catch(err){
            res.status(500).json({msg:err.message})
        }
    },
    createPoster: async(req,res)=>{
        try{
            const {images,text,target}=req.body
            if(!images)
                return res.status(400).json({msg:"No image "})
            const newPoster=new Poster({images,text,target})

            await newPoster.save()
            res.json({msg:"created a Poster"})
        }catch(err){
            res.status(500).json({msg:err.message})
        }
    },
    deletePoster: async(req,res)=>{
        try{
            await Poster.findByIdAndDelete(req.params.id)
            res.json({msg:"Deleted poster"})
        }catch(err){
            res.status(500).json({msg:err.message})
        }
    },
    updatePoster: async(req, res) =>{
        try {
            const {target,images,text} = req.body;
            if(!images) return res.status(400).json({msg: "No image upload"})

            await Poster.findOneAndUpdate({_id: req.params.id}, {
                target,images,text
            })

            res.json({msg: "Updated a Poster"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }
}






module.exports=posterCtrl
