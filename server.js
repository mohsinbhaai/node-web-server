const express = require('express');
const hbs = require('hbs');
var app = express();
const fs = require('fs');

const port = process.env.PORT || 3000;


hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');


app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFileSync('looser.txt', log + '\n');
  next();
});

app.use((req, res, next) => {
  res.render('maintenance.hbs');
  //next();
});

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.get('/', (req, res) => {
  res.render('home.hbs', {
    welcomeMessage: 'welcome to my website'
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    aboutPage: 'About Page'
    //date: new Date().getFullYear()
  });
});

app.get('/home', (req, res) => {
  res.render('home.hbs', {
    homePage: 'Home Page'
    //date: new Date().getFullYear()
  });
});

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Hey, bad request page'
  });
});

app.listen(port, () => {
  console.log('ready to go');
});
