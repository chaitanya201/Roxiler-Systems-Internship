const express = require('express')
const cors = require('cors')
const PORT = 5000
const userRoutes = require('./routes/userRoutes.js');

const app = express()
app.use(express.json())
app.use(cors())
app.use('/user', userRoutes)

app.listen(PORT, (err) => {
    if(err) {
        console.log("error while staring server");
    } else {
        console.log("server started at port ", PORT);
    }
})