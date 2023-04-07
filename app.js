const express = require('express');
const app = express();
const userRoute = require ('./routes/users-route')


app.use (express.static('./public'))
app.use (express.urlencoded({extended: false}))
app.use (express.json())

// app.use("/users", userRoute);



// init server
app.listen(5000, () => {
    console.log('Server is running on port 5000');
})