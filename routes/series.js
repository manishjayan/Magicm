const express = require('express')
const series = require('../models/series')
const router = express.Router()

router.get('/new', (req, res) => {
  res.render('series/new', { series: new series() })
})

router.get('/edit/:id', async (req, res) => {
  const serieses = await series.findById(req.params.id)
  res.render('series/edit', { series: serieses })
})

router.post('/', async (req, res, next) => {
  req.series = new series()
  next()
}, saveseriesAndRedirect('new'))

router.put('/:id', async (req, res, next) => {
  req.series = await series.findById(req.params.id)
  next()
}, saveseriesAndRedirect('edit'))

router.delete('/:id', async (req, res) => {
  await series.findByIdAndDelete(req.params.id)
  res.redirect('/')
})

function saveseriesAndRedirect(path) {
  return async (req, res) => {
    let series = req.series
    series.title = req.body.title
    series.description = req.body.description
    series.googledrive = req.body.googledrive
    series.mega = req.body.mega
    try {
      series = await series.save()
      res.redirect(`/`)
    } catch (e) {
      res.render(`series/${path}`, { series: series })
    }
  }
}

module.exports = router