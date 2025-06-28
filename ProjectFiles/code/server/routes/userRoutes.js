const express = require('express');
const router = express.Router();

const Booking = require('../models/Booking');
const Flight = require('../models/Flight');
const verifyToken = require("../middleware/authMiddleware");

// ✅ GET: Protected User Dashboard
router.get('/dashboard', verifyToken, (req, res) => {
  if (req.user.role !== 'user') {
    return res.status(403).json({ message: 'Access denied for this role' });
  }

  res.json({ message: 'Welcome to User Dashboard' });
});

// ✅ POST: Book a flight
router.post("/book", verifyToken, async (req, res) => {
  try {
    const {
  flightId,
  flightNumber,
  origin,
  destination,
  date,
  departureTime,
  arrivalTime,
  startingPrice,
  availableSeats,
  passengers,
  totalAmount,
  email,mobile
} = req.body;

const newBooking = new Booking({
  userId: req.user.id,
  flightId,
  flightNumber,
  origin,
  destination,
  date,
  departureTime,
  arrivalTime,
  startingPrice,
  availableSeats,
  passengers,
  totalAmount,
  email,
  mobile,
  status: 'confirmed'
});


    await newBooking.save();
    res.status(201).json({ message: "Booking confirmed" });
  } catch (error) {
    console.error("Booking error:", error);
    res.status(500).json({ error: "Booking failed" });
  }
});

// ✅ GET: Fetch bookings for a user
router.get("/bookings", verifyToken, async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user.id }).sort({ date: -1 });
    res.json(bookings);
  } catch (err) {
    console.error("Error fetching bookings:", err);
    res.status(500).json({ error: "Failed to retrieve bookings" });
  }
});

router.put('/cancel/:id', verifyToken, async (req, res) => {
  try {
    await Booking.findByIdAndUpdate(req.params.id, { status: 'cancelled' });
    res.json({ message: 'Booking cancelled' });
  } catch (err) {
    res.status(500).json({ error: 'Cancellation failed' });
  }
});

// ✅ Export ONCE
module.exports = router;
