const express=require('express')
const router=require('./router/apiEntriesRoute')
require('dotenv').config();
const cors = require('cors');

const app=express()

const port=process.env.PORT || 3000; 

// Body-parser middleware
app.use(cors());
app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.use(express.static(__dirname+'/public'))



//* RUTAS

app.use('/api/entries',router)
app.use('/api/user',require('./router/apiUserRouter'))
app.use('/api/category',require('./router/apiCategoryRouter'))


app.listen(port,()=>{
    console.log('servidor a la escucha del puerto 3000 ');
})