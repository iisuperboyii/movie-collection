import mongoose, { Mongoose } from "mongoose";

const movie = new mongoose.Schema({
  title: {type:String, required: true},
  director: {type:String, required: true},
  genre: {type:String, required: true},
  releaseYear: {type:Number, required: true},
  availableCopies: {type:Number, required: true}
})

const Movie = mongoose.model('Movie', movie);

export default Movie