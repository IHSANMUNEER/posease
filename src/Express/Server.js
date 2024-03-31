const express =  require('express')
var app=express();
require("dotenv").config()
const db  = require("./Db/Connection")

const port = 3001
app.use(express.json());

const my_routes = require("./Routes/Route");

app.get('/', (req, res) => {
    res.send('Welcome')
})

app.use("/posease",my_routes)


app.listen(port, async()=>{
    await db(process.env.MONGODB_URL);
    console.log('listening on port 3001')
})