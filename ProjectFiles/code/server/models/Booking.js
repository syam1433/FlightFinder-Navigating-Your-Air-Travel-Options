// backend/models/Booking.js
const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  userId: String,
  flightId: String,
  flightNumber: String,
  origin: String,
  destination: String,
  date: String,
  departureTime: String,
  arrivalTime: String,
  startingPrice: Number,
  availableSeats: Number,
  passengers: [
    {
      name: String,
      age: Number,
      gender: String,
      seatNumber: String,
    },
  ],
  totalAmount: Number,
  email: String,
  mobile: String,
  status: {
    type: String,
    default: 'confirmed'
  },
  bookingTime: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Booking', bookingSchema);
