const Carosel = require('../models/caroselModel')


const caroselCtrl={
    getCarosel: async(req,res)=>{
        try{
            const carosel=await Carosel.find()
            res.json({
                status:"success",
                length:carosel.length,
                carosel:carosel
            })
        }catch(err){
            res.status(500).json({msg:err.message})
        }
    },
    createCarosel: async(req,res)=>{
        try{
            const {images}=req.body
            if(!images)
                return res.status(400).json({msg:"No image selected"})
            const newCarosel=new Carosel({images})

            await newCarosel.save()
            res.json({msg:"created a carosel"})
        }catch(err){
            res.status(500).json({msg:err.message})
        }
    },
    deleteCarosel: async(req,res)=>{
        try{
            await Carosel.findByIdAndDelete(req.params.id)
            res.json({msg:"Deleted carosel"})
        }catch(err){
            res.status(500).json({msg:err.message})
        }
    }


}


module.exports=caroselCtrl
