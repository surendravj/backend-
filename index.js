require('dotenv').config();
const express = require('express');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const cookieparser = require('cookie-parser');
const cors = require('cors');
const app = express();


// modules importing
const auth = require('./routes/auth');
const user = require('./routes/user');
const category = require('./routes/category');
const product = require('./routes/product');
const order = require('./routes/order');
const stripe=require('./routes/stripe');
const portfolio=require('./routes/portfolio');


// middleware configuration
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
app.use(cookieparser());
app.use(cors());


//Database configuration
mongoose.connect(process.env.DATABASE,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    })
    .then(() => console.log('DB Connected...'))
    .catch(e => console.log(e))


// routing path
app.use('/api', auth);
app.use('/api', user);
app.use('/api', category);
app.use('/api', product);
app.use('/api', order);
app.use('/api',stripe);
app.use('/api',portfolio);

// server and port configuration
let port = process.env.PORT;
if (port == null || port == "") {
  port = 5000;
}
app.listen(port);
