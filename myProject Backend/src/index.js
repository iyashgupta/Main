const express  = require('express')
const app = express()
const cors = require('cors')
const { HomeRoute } = require('../src/Routes/HomeRoute')
const { connection } = require('../db')

app.use(express.json())
app.use(cors())

app.use("/", HomeRoute)


app.listen(8080, async () => {
    try{
        await connection
        console.log('connected to db')
    }catch(err){
       console.log('connection rejected')
        console.log(err)
    }
       console.log('server running on 8080')
})