const Movie = require('../../models/movie')

const dataController = {
  // Index,
  index (req, res, next) {
    Movie.find({}, (err, foundMovies) => {
      if (err) {
        res.status(400).send({
          msg: err.message
        })
      } else {
        res.locals.data.movies = foundMovies
        next()
      }
    })
  },
  // Destroy
  destroy (req, res, next) {
    Movie.findByIdAndDelete(req.params.id, (err, deletedMovie) => {
      if (err) {
        res.status(400).send({
          msg: err.message
        })
      } else {
        res.locals.data.movie = deletedMovie
        next()
      }
    })
  },
  // Update
  update (req, res, next) {
    Movie.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, updatedMovie) => {
      if (err) {
        res.status(400).send({
          msg: err.message
        })
      } else {
        res.locals.data.movie = updatedMovie
        next()
      }
    })
  },
  // Create
  create (req, res, next) {
    Movie.create(req.body, (err, createdMovie) => {
      if (err) {
        res.status(400).send({
          msg: err.message
        })
      } else {
        res.locals.data.movie = createdMovie
        next()
      }
    })
  },
  // Edit
  // Show
  show (req, res, next) {
    Movie.findById(req.params.id, (err, foundMovie) => {
      if (err) {
        res.status(404).send({
          msg: err.message,
          output: 'Could not find a movie with that ID'
        })
      } else {
        res.locals.data.movie = foundMovie
        next()
      }
    })
  }
}

const apiController = {
  index (req, res, next) {
    res.json(res.locals.data.movies)
  },
  show (req, res, next) {
    res.json(res.locals.data.movie)
  }
}

module.exports = { dataController, apiController }