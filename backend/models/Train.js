const mongoose = require('mongoose');

const trainSchema = new mongoose.Schema({
  name: { type: String, required: true },
  from: { type: String, required: true },
  to: { type: String, required: true },
  totalSeats: { type: Number, required: true },
  availableSeats: { type: Number, required: true },
});

module.exports = mongoose.model('Train', trainSchema);