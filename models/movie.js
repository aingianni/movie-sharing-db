const { Schema, model } = require('mongoose')

const movieSchema = new Schema({
    Title: String,
    Rated: String,
    Released: String,
    Runtime: String,
    Genre: String,
    Director: String,
    Plot: String,
    Poster: String,
    BoxOffice: String,
}, {
    timestamps: true
})

const Movie = model('Movie', movieSchema)

module.exports = Movie