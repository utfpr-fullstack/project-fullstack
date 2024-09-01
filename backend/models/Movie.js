const mongoose = require('../db/connection');

const { Schema } = mongoose;

const Movie = mongoose.model(
    'Movie',

    new Schema(
        {
            title: {type: String, required: true},
            genre: {type: String, required: true},
            images: {type: Array, required: true},
            description: {type: String, required: true},
            runtime: {type: String, required: true},
            available: {type: Boolean, required: true},
            user: Object,
            renter: Object
        },
        {timestamps: true})
);

module.exports = Movie;