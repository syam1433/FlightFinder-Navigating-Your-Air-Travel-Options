// routes/flightRoutes.js

const express = require('express');
const router = express.Router();
const Flight = require('../models/Flight');

// GET /api/flights
router.get('/', async (req, res) => {
  try {
    const flights = await Flight.find(); // fetch all flights from DB
    res.json(flights);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching flights', error });
  }
});

module.exports = router;
