// index.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/workouts', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define a schema for workouts
const workoutSchema = new mongoose.Schema({
  date: String,
  exercises: [
    {
      name: String,
      weightReps: String,
      sets: [String],
    },
  ],
});

const Workout = mongoose.model('Workout', workoutSchema);

// Endpoint to save a workout
app.post('/api/workout', async (req, res) => {
  const { date, exercises } = req.body;
  const workout = new Workout({ date, exercises });
  try {
    await workout.save();
    res.status(201).json({ message: 'Workout saved successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to save workout.' });
  }
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
