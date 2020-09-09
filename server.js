const express = require('express')
const mongoose = require('mongoose')
const series = require('./models/series')
const seriesRouter = require('./routes/series')
const methodOverride = require('method-override')
const app = express()

const db = require('./config/keys').mongoURI;
mongoose
  .connect(
    db,
    { useNewUrlParser: true ,useUnifiedTopology: true,useCreateIndex: true}
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))

app.get('/', async (req, res) => {
  const serieses = await series.find().sort({ createdAt: 'desc' })
  res.render('series/index', { series: serieses })
})

app.use('/series', seriesRouter)

app.listen(5000)