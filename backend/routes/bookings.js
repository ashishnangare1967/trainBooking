const express = require('express');
const Booking = require('../models/Booking');
const Train = require('../models/Train');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

router.post('/', authMiddleware, async (req, res) => {
  try {
    const { trainId, seats } = req.body;
    const train = await Train.findById(trainId);
    if (!train) return res.status(404).json({ error: 'Train not found' });
    if (train.availableSeats < seats) return res.status(400).json({ error: 'Not enough seats available' });

    const booking = new Booking({
      user: req.user.id,
      train: trainId,
      seats,
    });

    await booking.save();
    train.availableSeats -= seats;
    await train.save();

    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ error: 'Error creating booking' });
  }
});

router.get('/', authMiddleware, async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id }).populate('train');
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching bookings' });
  }
});

module.exports = router;