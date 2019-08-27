const express = require('express');
const app = express();
const expressLayout = require('express-ejs-layouts');
const indexRouter = require('./routes/index')
const mongoose = require('mongoose');

// if(process.env.NODE_ENV !== 'production') {
//     require('dotenv').parse()
// }

// mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true})
mongoose.connect('mongodb://localhost/Cheese', {useNewUrlParser: true, useCreateIndex: true})
mongoose.Promise = global.Promise;

const db = mongoose.connection
db.on('error', error=> console.error(error))
db.once('open', error=> console.error(error))

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayout)
app.use(express.static('public'))

app.use('/', indexRouter)

app.listen(process.env.PORT || 8000);