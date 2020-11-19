const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const cors = require('cors');
const path = require('path');
const route = require('./routes/routes');
var url = "mongodb+srv://contactlist:9125078527@cluster0.zwldr.mongodb.net/contactlist?retryWrites=true&w=majority"


var app = express();

app.use(cors());

//MongoDB connection
mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}); 

//Declare Port
const port = 4000;


//Routes
app.use('/', route);




app.get('/', (req, res) => {
    res.send('Your Project is working fantastic.');
});



app.listen(port);
