const fs = require('fs');
const express = require('express');
const path = require('path');
const bodyparser = require('body-parser');
const session = require("express-session");
const{v4:uuidv4} = require("uuid");

const router = require('./router')

const app = express();

const port = process.env.PORT||3000;

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:true}))

app.set('view engine', 'ejs');

//mengambil style css yang aset static
app.use('/static',express.static(path.join(__dirname, 'public')))
//menambahkan gambar dan membuat sesi dengan uuid

app.use(session({
    secret:uuidv4(),
    resave:false,
    saveUninitialized:true,
}));

app.use('/route', router);

//mengambil home route
app.get('/', (req,res) => {
    res.render('base', {title:"Login System"})
});

app.listen(port, () => {console.log("Listening to the server on http://localhost:3000")});