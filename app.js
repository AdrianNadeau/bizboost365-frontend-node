
const dotenv = require('dotenv');
dotenv.config({ path: "./config.env" });
var app = require('express')();
var express = require('express');
var path = require('path');
var http = require('http').Server(app);

// import Router file
// var pageRouter = require('./routes/routes');
// var user = require("./models/UserModel");

var session = require('express-session');
var bodyParser = require('body-parser');
var flash = require('connect-flash');
var i18n = require("i18n-express");
var urlencodeParser = bodyParser.urlencoded({ extended: true });
app.use(urlencodeParser);
app.use(session({ resave: false, saveUninitialized: true, secret: 'bizboost' }));
app.use(flash());

/* ---------for database connection---------- */
// const DB = process.env.DATABASE_URL;
// mongoose.connect(DB, {
//     useNewUrlParser: true
// }).then((con) => console.log("DB connection successfully..!"));
// serve the homepage

app.get("/", (req, res) => {
    res.send('Homepage')
  });
  app.get("/login", (req, res) => {
    // res.send('/login')
    res.send("this is login page")
  });

// for i18 usr
app.use(i18n({
    translationsPath: path.join(__dirname, 'i18n'), // <--- use here. Specify translations files path.
    siteLangs: ["en", "ru", "it", "gr", "sp"],
    textsVarName: 'translation'
}));
app.use(express.static(__dirname + '/public'));

app.use('/public', express.static('public'));
app.set('layout', 'layout/layout');
var expressLayouts = require('express-ejs-layouts');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(expressLayouts);

// Define All Route 
// pageRouter(app);

app.all('*', function (req, res) {
    res.locals = { title: '404 Page Note found' };
    res.render('auth/error-404', { layout: "layout/layout-without-nav" });
});

http.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));