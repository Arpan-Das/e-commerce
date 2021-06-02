const mongoose = require('mongoose')

const posterSchema = new mongoose.Schema({
    
    images:{
        type: Object,
        required: true
    },
    text:{
        type:String
    },
    target:{
        type:String
    } 
   
   
},{
    timestamps: true //important
})


module.exports = mongoose.model("Poster", posterSchema)