const express = require('express');
const Workout = require('../models/Workout');
const router = express.Router();

// GET all workouts
router.get('/', async (req, res) => {
  const workouts = await Workout.find().sort({ createdAt: -1 });
  res.json(workouts);
});

// POST a new workout
router.post('/', async (req, res) => {
  const { title, reps, sets, weight } = req.body;
  try {
    const workout = await Workout.create({ title, reps, sets, weight });
    res.status(201).json(workout);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE a workout
router.delete('/:id', async (req, res) => {
  try {
    await Workout.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
