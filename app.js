const express = require('express');
const app = express();
const authRoutes = require('./Routes/authRoutes')
const hbs = require('hbs')
const path = require('path')
app.use(express.urlencoded({ extended: false }))
const static_path = path.join(__dirname, '../public')
const template_path = path.join(__dirname, './templates/views')
const partials_path = path.join(__dirname, './templates/partials')
app.use(express.static(static_path))

app.set("view engine", 'hbs');
app.set("views", template_path)
hbs.registerPartials(partials_path)

app.use(express.json({ limit: '10kb' }));

app.get('/', (req, res) => {
    res.render('index');
})
app.get('/login', (req, res) => {
    res.render('login');
})

app.get('/home', (req, res) => {
    res.render('home');
})
app.use('/', authRoutes);
module.exports = app