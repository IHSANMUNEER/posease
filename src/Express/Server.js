const express =  require('express')
var app=express();
require("dotenv").config()
const db  = require("./Db/Connection")
const cors = require('cors');

require("dotenv").config()
//////
const admin = require('firebase-admin');
const serviceAccount = require('./posease.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
  
////
const port = 5001
// const port = process.env.PORT || 3001;
app.use(express.json());
app.use(cors());

const my_routes = require("./Routes/Route");

app.get('/', (req, res) => {
    res.send('Welcome')
})

app.use("/posease",my_routes)


app.listen(port, async()=>{
    await db(process.env.MONGODB_URL);
    console.log(`server listing at ${port}`)
})

