const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Flight = require('../models/Flight');
const Booking = require('../models/Booking');
const verifyToken = require('../middleware/authMiddleware');
const Operator = require('../models/Operator');

// ✅ Only allow admins
router.use(verifyToken, (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Access denied' });
  }
  next();
});

router.get('/dashboard', verifyToken, (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied for this role' });
  }

  res.json({ message: 'Welcome to Admin Dashboard' });
});

// ✅ GET all users
router.get('/all-users', async (req, res) => {
  try {
    const users = await User.find({}, '-password');
    const operators = await Operator.find({}, '-password');

    const allUsers = [
      ...users.map(u => ({ ...u.toObject(), role: 'user' })),
      ...operators.map(o => ({ ...o.toObject(), role: 'operator' })),
    ];

    res.json(allUsers);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// ✅ GET all flights
router.get('/all-flights', async (req, res) => {
  try {
    const flights = await Flight.find().sort({ date: -1 });
    res.json(flights);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch flights' });
  }
});

// ✅ GET all bookings
router.get('/all-bookings', async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ date: -1 });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
});

// ✅ GET pending operator applications
router.get('/pending-operators', verifyToken, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    const pendingOperators = await Operator.find({ approved: false });
    res.json(pendingOperators);
  } catch (error) {
    console.error('Pending operators fetch error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});



// Approve operator
router.put("/approve-operator/:id", verifyToken, async (req, res) => {
  try {
    await Operator.findByIdAndUpdate(req.params.id, { approved: true });
    res.json({ message: "Operator approved" });
  } catch (err) {
    res.status(500).json({ message: "Approval failed", error: err });
  }
});

// Reject operator (delete entry)
router.put("/reject-operator/:id", verifyToken, async (req, res) => {
  try {
    await Operator.findByIdAndDelete(req.params.id);
    res.json({ message: "Operator rejected and removed" });
  } catch (err) {
    res.status(500).json({ message: "Rejection failed", error: err });
  }
});




module.exports = router;
