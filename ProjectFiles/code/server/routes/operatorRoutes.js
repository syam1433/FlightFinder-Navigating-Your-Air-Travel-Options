const express = require('express');
const verifyToken = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/dashboard', verifyToken, (req, res) => {
  if (req.user.role !== 'operator') {
    return res.status(403).json({ message: 'Access denied for this role' });
  }

  res.json({ message: 'Welcome to operator Dashboard' });
});

const Flight = require('../models/Flight');
const Booking = require('../models/Booking');

// ✅ Add new flight by operator
router.post('/operator-flights', verifyToken, async (req, res) => {
  try {
    if (req.user.role !== 'operator') {
      return res.status(403).json({ message: 'Only operators can add flights' });
    }

    const {
      flightNumber,
      origin,
      destination,
      date,
      departureTime,
      arrivalTime,
      startingPrice,
      availableSeats,
    } = req.body;

    const newFlight = new Flight({
      flightNumber,
      origin,
      destination,
      date,
      departureTime,
      arrivalTime,
      startingPrice,
      availableSeats,
      addedBy: req.user.id, // operator's ID
    });

    const savedFlight = await newFlight.save();
    res.status(201).json(savedFlight);
  } catch (error) {
    console.error('Add flight error:', error);
    res.status(500).json({ message: 'Failed to add flight' });
  }
});


// ✅ Get flights added by the operator
router.get('/operator-flights', verifyToken, async (req, res) => {
  try {
    if (req.user.role !== 'operator') {
      return res.status(403).json({ message: 'Only operators can view their flights' });
    }

    const flights = await Flight.find({ addedBy: req.user.id });
    res.json(flights);
  } catch (error) {
    console.error('Fetch operator flights error:', error);
    res.status(500).json({ message: 'Failed to fetch flights' });
  }
});

// ✅ Get bookings for flights added by the operator
router.get('/operator-bookings', verifyToken, async (req, res) => {
  try {
    if (req.user.role !== 'operator') {
      return res.status(403).json({ message: 'Only operators can view bookings' });
    }

    const flights = await Flight.find({ addedBy: req.user.id }).select('_id');
    const flightIds = flights.map(f => f._id);

    const bookings = await Booking.find({ flightId: { $in: flightIds } }).populate('flightId');
    res.json(bookings);
  } catch (error) {
    console.error('Fetch operator bookings error:', error);
    res.status(500).json({ message: 'Failed to fetch bookings' });
  }
});

module.exports = router;


module.exports = router;