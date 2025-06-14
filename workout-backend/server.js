// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const sessionRoutes = require("./routes/sessions");
const workoutRoutes = require("./routes/workouts"); 

const app = express();
app.use(cors());
app.use(express.json());


app.use('/api/workouts', workoutRoutes);
app.use("/api/sessions", sessionRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(5000, () => console.log('Server running on port 5000'));
  })
  .catch((err) => console.log(err));
