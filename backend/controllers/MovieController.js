const Movie = require('../models/Movie');

const getToken = require('../helpers/get-token');
const getUserByToken = require('../helpers/get-user-by-token');

const ObjectId = require('mongoose').Types.ObjectId;

module.exports = class MovieController {

    static async create(req, res) {

        const { title, genre, description, runtime } = req.body;

        const images = req.files

        const available = true;

        if(!title) {
            return res.status(422).json({message: 'Title is required'});
        }

        if(!genre) {
            return res.status(422).json({message: 'Genre is required'});
        }

        if(!description) {
            return res.status(422).json({message: 'Description is required'});
        }

        if(!runtime) {
            return res.status(422).json({message: 'Runtime is required'});
        }

        if(images.length === 0) {
            return res.status(422).json({message: 'Images are required'});
        }

        const token = getToken(req);
        const user = await getUserByToken(token);

        const movie = new Movie({
            title,
            genre,
            description,
            runtime,
            available,
            images: [],
            user: {
                _id: user._id,
                name: user.name,
                image: user.image,
                phohes: user.phone
            }
        });

        images.map((image) => {
            movie.images.push(image.filename)
        })

        try {
            const savedMovie = await movie.save();
            res.status(201).json({message: 'Movie created', savedMovie});
        } catch (error) {
            res.status(500).json({message: error.message})
        }
    }

    static async getAll(req, res) {
        const movies = await Movie.find().sort("-createdAt");

        res.status(200).json({movies: movies});
    }

    static async getAllUserMovies(req, res) {
        const token =  getToken(req);
        const user = await getUserByToken(token);

        const movies = await Movie.find({"user._id": user._id}).sort("-createdAt");

        res.status(200).json({movies});
    }

    static async getAllUserRentals(req, res) {
        const token =  getToken(req);
        const user = await getUserByToken(token);

        const movies = await Movie.find({"renter._id": user._id}).sort("-createdAt");

        res.status(200).json({movies});
    }

    static async getMovieById(req, res) {
        const id = req.params.id;

        if(!ObjectId.isValid(id)) {
            return res.status(422).json({message: 'Invalid movie id'});
        }

        const movie = await Movie.findOne({_id: id});

        if(!movie) {
            return res.status(404).json({message: 'Movie not found'});
        }

        res.status(200).json({movie: movie});
    }

    static async deleteMovieById(req, res) {
        const id = req.params.id;

        if(!ObjectId.isValid(id)) {
            return res.status(422).json({message: 'Invalid movie id'});
        }

        const movie = await Movie.findOne({_id: id});

        if(!movie) {
            return res.status(404).json({message: 'Movie not found'});
        }

        const token = getToken(req);
        const user = await getUserByToken(token);

        if(movie.user._id.toString() !== user._id.toString()) {
            return res.status(403).json({message: 'You are not allowed to delete this movie'});
        }

        await Movie.findByIdAndDelete(id);
        res.status(200).json({message: 'Movie deleted'});
    }

    static async updateMovie(req, res) {
        const id = req.params.id;

        const { title, genre, description, runtime } = req.body;

        const images = req.files

        const updatedData = {};

        const movie = await Movie.findOne({_id: id});

        if(!movie) {
            return res.status(404).json({message: 'Movie not found'});
        }

        const token = getToken(req);
        const user = await getUserByToken(token);

        if(movie.user._id.toString() !== user._id.toString()) {
            return res.status(403).json({message: 'You are not allowed to delete this movie'});
        }

        if(!title) {
            return res.status(422).json({message: 'Title is required'});
        } else {
            updatedData.title = title;
        }


        if(!genre) {
            return res.status(422).json({message: 'Genre is required'});
        } else {
            updatedData.genre = genre;
        }

        if(!description) {
            return res.status(422).json({message: 'Description is required'});
        } else {
            updatedData.description = description;
        }

        if(!runtime) {
            return res.status(422).json({message: 'Runtime is required'});
        } else {
            updatedData.runtime = runtime;

        }

        if(images.length === 0) {
            return res.status(422).json({message: 'Images are required'});
        } else {
            updatedData.images = [];
            images.map((image) => {
                updatedData.images.push(image.filename)
            })
        }

        await Movie.findByIdAndUpdate(id, updatedData);
        res.status(200).json({message: 'Movie updated'});
    }

    static async doRent(req, res) {
        const id = req.params.id;

        const movie = await Movie.findOne({_id: id});

        if(!movie) {
            return res.status(404).json({message: 'Movie not found'});
        }

        const token = getToken(req);
        const user = await getUserByToken(token);

        if(movie.user._id.toString() !== user._id.toString()) {
            return res.status(403).json({message: 'You are not allowed to rent this movie'});
        }

        movie.available = false;

        await Movie.findByIdAndUpdate(id, movie);
        res.status(200).json({message: 'Movie rented'});
    }

}