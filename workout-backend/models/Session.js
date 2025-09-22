const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema({
  name:     String,
  date:     Date,
  userId:   String,          // owner’s Firebase UID
  userName: String,          // display name (email-prefix)
  isPublic: { type: Boolean, default: true },

  exercises: [
    { title: String, sets: Number, reps: Number, weight: Number }
  ]
});

module.exports = mongoose.model("Session", sessionSchema);
