require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const cookieParser = require('cookie-parser')
const path = require('path')

const app =express()
app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use(fileUpload({
    useTempFiles: true
}))

// Routes (API)
app.use('/user', require('./routes/userRouter'))
app.use('/api', require('./routes/categoryRoutes'))
app.use('/api', require('./routes/upload'))
app.use('/api', require('./routes/uploadCarosel'))
app.use('/api', require('./routes/uploadPoster'))

app.use('/api', require('./routes/productRoutes'))
app.use('/api', require('./routes/paymentRouter'))
app.use('/api', require('./routes/caroselRoutes'))
app.use('/api', require('./routes/posterRoutes'))

// app.get('/', (req,res) =>{
//     res.json({msg: "Welcome to my backend, Thanks"})
// })



// connect to mongodb
const URI = process.env.MONGODB_URL
mongoose.connect(URI, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
}, err =>{
    if(err) throw err;
    console.log(('Connected to MongoDB'))
})


if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'))
    app.get('*', (req, res) =>{
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
    })
}


const PORT = process.env.PORT || 5000
app.listen(PORT, () =>{
    console.log('Server is running on port ',PORT)
})



  