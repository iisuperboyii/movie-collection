import express from 'express';
import Movie from './schema.js'
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config()
const app = express();
app.use(express.json());


mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));


app.post('/movies', async (req, res) => {
  const { title, director, genre, releaseYear, availableCopies  } = req.body;
  const movies = new Movie({ title, director, genre, releaseYear, availableCopies });

  try {
    const savedMovie = await movies.save();
    res.status(201).json({ message: 'Movie added', item: savedMovie });
  } catch (error) {
    console.log(error)
    res.status(400).json({ message: 'Error saving movie', error });
  }
});

app.get('/movies', async (req, res) => {
  try {
    const movies = await Movie.find();
    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching movies', error });
    res.status(404).json({ message: 'Error fetching movies', error });

  }
});

app.get('/movies/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const movie = await Movie.findById(id);
    if (!movie) {
      res.status(404).json({ message: 'Movie not found' });
    } else {
      res.status(200).json(movie);
    }
  } catch (error) {

    res.status(500).json({ message: 'Error fetching movie', error });
    res.status(404).json({ message: 'Error fetching movie', error });
  }
});

app.delete('/movies/:id', async(req,res) => {
  try {
    const id = req.params.id;
    const movie = await Movie.findByIdAndDelete(id);
    if (!movie) {
      res.status(404).json({ message: 'Movie not found' });
    } else {
      res.status(200).json({ message: 'Movie deleted successfully' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting movie', error });
  }
})

app.put('/movies/:id', async(req,res) => {
  try {
    const id = req.params.id;
    const movie = await Movie.findByIdAndUpdate(id, req.body, { new: true });
    if (!movie) {
      res.status(404).json({ message: 'Movie not found' });
    } else {
      res.status(200).json({ message: 'Movie updated successfully', item: movie });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating movie', error });
  }
})


app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
