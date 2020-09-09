const mongoose = require('mongoose')
const slugify = require('slugify')

const seriesSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  googledrive: {
    type: String,
  },
  mega: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  slug: {
    type: String,
    required: true,
    unique: true
  }
})

seriesSchema.pre('validate', function(next) {
  if (this.title) {
    this.slug = slugify(this.title, { lower: true, strict: true })
  }
  next()
})

module.exports = mongoose.model('series', seriesSchema)