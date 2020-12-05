const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const mongoose = require('mongoose')
require('dotenv').config();
const postRouter = require ('./controller/post')


const config ={
    useNewUrlParser: true,
    useUnifiedTopology: true
}



mongoose.connect(process.env.MONGODB_URI,config)
.then(() => {
    console.log("successfully connected to MongoDB");
})

.catch(err => {
    console.error("Some problem occured")
})

app.use(bodyParser.json());
app.use('/post', postRouter);

app.listen(process.env.PORT, () =>{
    console.log("Express app is working", process.env.PORT)
})