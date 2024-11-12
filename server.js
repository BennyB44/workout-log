const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public')); // Serves static files from 'public' folder

// Connect to MongoDB
mongoose.connect('mongodb+srv://BennyB44:BennyB%2344%21@gymtracker.kkwvu.mongodb.net/?retryWrites=true&w=majority&appName=gymtracker', {
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
      sets: [        
        {
          reps: String,
          weight: String,
        },
      ],
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
    console.error('Error saving workout:', error);
    res.status(500).json({ error: 'Failed to save workout.' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
