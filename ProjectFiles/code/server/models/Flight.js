const mongoose = require('mongoose');

const flightSchema = new mongoose.Schema({
  airline: String,
  flightNumber: String,
  origin: String,
  destination: String,
  date: String,
  departureTime: String,
  arrivalTime: String,
  startingPrice: Number,
  availableSeats: Number,
  addedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User',required:true }  // 👈 Add this line
});

module.exports = mongoose.model('Flight', flightSchema);
