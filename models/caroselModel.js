const mongoose = require('mongoose')

const caroselSchema = new mongoose.Schema({
    
    images:{
        type: Object,
        required: true
    },
    
   
   
},{
    timestamps: true //important
})


module.exports = mongoose.model("Carosel", caroselSchema)