const express = require('express');
const app = express();
const regUser = require ('./routes/users')


app.use (express.static('./public'))
app.use (express.urlencoded({extended: false}))
app.use (express.json())

app.use("/register", regUser);



// init server
app.listen(5000, () => {
    console.log('Server is running on port 5000');
})